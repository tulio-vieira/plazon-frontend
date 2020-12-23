import React, { Component } from 'react';
import Comment from './Comment';
import StatefulCreateComment from './StatefulCreateComment';
import { withStyles } from '@material-ui/core';
import LinkThread from './LinkThread';
import axios from '../../axios-instance';

const styles = (theme) => ({
  commentWrapper: {
    padding: theme.spacing(3),
    backgroundColor: theme.palette.background.mid,
    [theme.breakpoints.down(400)]: {
      padding: theme.spacing(1.5)
    }
  },
  spacer: {
    marginBottom: theme.spacing(2)
  }
});

class Comments extends Component {
  constructor(props) {
    super(props);
    this.initializeData(props.comments);
    if (props.comments) this.updateCommentTree(props.comments);
    this.state = { renderSwitch: false };
  }

  initializeData(comments) {
    // holds data about local state of comments (is it showing its children? etc...)
    this.commentsData = {};
    // holds the structure of the comment tree in the following way:
    // comment_tree = { <comment_id>: { children: [ <comment>, <comment> ] children_count: 2 }, <other_comment_id>: {...}, ... } 
    // children_count is necessary because the user can add comments and children_count will not change,
    // and then we can fetch for more comments in the database using the right index based on children_count
    this.comment_tree = {};
    // holds the keys of the comments added. That way, when the servers retrieves the comments that were just added, 
    // they will not be added again to the comment tree
    this.comment_ids_added = {};
    this.startingDepth = comments[0] ? comments[0].depth : 0;
    this.root = comments[0] ? comments[0].parent_id : this.props.postId;
  }

  shouldComponentUpdate(nextProps) {
    // has to do with continue thread
    if (nextProps.rootId !== this.props.rootId) {
      this.initializeData(nextProps.comments);
      this.updateCommentTree(nextProps.comments);
      return true;
    }
    // has to do with loadmore
    if (nextProps.comments !== this.props.comments) {
      this.updateCommentTree(nextProps.comments);
      return true;
    }
    return true;
  }
 
  updateCommentTree = (comments_arr) => {
    let comment_tree = this.comment_tree;
    for (let comment of comments_arr) {
      if (this.comment_ids_added[comment._id]) continue;
      if (comment_tree[comment.parent_id]) {
        comment_tree[comment.parent_id].children.push(comment);
        comment_tree[comment.parent_id].children_count++;
      } else {
        comment_tree[comment.parent_id] = { children: [comment], children_count: 1 };
      }
    }
  }

  postNewComment = (depth, parent_id, body) => {
    axios ({
      method: 'POST',
      url: '/comments',
      headers: { 'Authorization': 'Bearer ' + this.props.token },
      data: {
        post_id: this.props.postId,
        parent_id,
        body,
        depth,
      }
    }).then(res => {
      this.comment_ids_added[res.data._id] = true;
      this.comment_tree[parent_id] ?
      this.comment_tree[parent_id].children.unshift(res.data) :
      this.comment_tree[parent_id] = { children: [res.data] };
      this.setState(prevState => ({renderSwitch: !prevState.renderSwitch}));
    }).catch(err => {
      this.comment_tree[parent_id] ?
      this.comment_tree[parent_id].children = [...this.comment_tree[parent_id].children] :
      this.comment_tree[parent_id] = { children: [] };
      this.setState(prevState => ({renderSwitch: !prevState.renderSwitch}));
      console.log(err);
    })
  }
  
  mapComments = (comments) => {
    return comments.map(comment => {
      
      let children_count = 0;
      try { children_count = this.comment_tree[comment._id].children_count || 0 } catch {};

      let children = this.comment_tree[comment._id]
        ? this.mapComments(this.comment_tree[comment._id].children) : null;

      let endOfThread = (comment.depth !== this.startingDepth) && ((comment.depth - this.startingDepth) % this.props.maxDepth) === 0;
      let loadMore = (children_count < comment.num_children);
      const startDepth = loadMore && !endOfThread ? (comment.depth + 1 - this.startingDepth) % this.props.maxDepth : null;

      return <Comment
        key={comment._id}
        like_count={comment.like_count}
        dislike_count={comment.dislike_count}
        liked={comment.liked}
        profile_pic={comment.author.profile_pic}
        author_id={comment.author._id}
        username={comment.author.username}
        onAuthFail={this.props.onAuthFail}
        date={comment.date_formatted}
        postNewComment={this.postNewComment.bind(this, comment.depth + 1, comment._id)}
        _id={comment._id}
        body={comment.body}
        handleData={this.handleCommentData}
        continueThread={ endOfThread && loadMore ? `/post/${this.props.postId}/${comment._id}` : null }
        loadMore={startDepth ? () => this.props.handleLoadMore(comment._id, children_count, startDepth) : null} >
          {children}
      </Comment>
    });
  }

  handleCommentData = (commentId, status, data) => {
    switch (status) {
      case 'willMount':
        if (this.commentsData[commentId]) return this.commentsData[commentId];
        return { showTextBox: false, show: true, newComment: '' };

      case 'willUnmount':
        return this.commentsData[commentId] = data;

      default:
        return { showTextBox: false, show: true, newComment: '' };
    }
  }

  render() {
    return (
      <div className={this.props.classes.commentWrapper}>
        {
          this.props.rootId === this.props.postId ?
          <StatefulCreateComment
            handleAuthFail={this.props.token ? null : this.props.onAuthFail}
            userPic={this.props.userPic}
            renderSwitch={this.state.renderSwitch}
            postNewComment={this.postNewComment.bind(this, 0, this.props.postId)} />
          : 
          <div className={this.props.classes.spacer}>
            <LinkThread to={'/post/' + this.props.postId}>Go back to main thread</LinkThread>
          </div>
        }
        {this.comment_tree[this.root] && this.mapComments(this.comment_tree[this.root].children)}

        {this.root === this.props.postId && this.comment_tree[this.root] && this.comment_tree[this.root].children_count < this.props.post_num_children &&
          <LinkThread onClick={() => this.props.handleLoadMore(this.root, this.comment_tree[this.root].children_count, 0)} >
              Load More
          </LinkThread>}

      </div>
    );
  }
}

export default withStyles(styles)(Comments);