import React, { Component } from 'react';
import Comment from './Comment';
import axios from '../../axios-instance';
import { withStyles } from '@material-ui/styles';
import { LinearProgress } from '@material-ui/core';
import { connect } from 'react-redux';

const styles = (theme) => ({
  loading: {
    marginBottom: theme.spacing(2)
  }
});

class Comments extends Component {
  constructor(props){
    super(props);
    this.commentsData= {};
    this.comment_tree = {};
    this.state = {loading: true};
    this.postId = '5f7f66994451551380105567';
  }

  componentDidMount() {
    this.makeRequest(this.postId)
    .then(res => {
      if (!res) return;
      this.updateCommentTree(res.data);
      this.setState({loading: false});
    })
  }

  handleLoadMore = (commentId, startIndex, depth) => {
    this.makeRequest(commentId, startIndex, 3)
    .then(res => {
      if (!res) return;
      this.updateCommentTree(res.data, depth + 1);
      this.setState({loading: false});
    })
  }
  
  updateCommentTree = (comments_arr) => {
    let comment_tree = this.comment_tree;
    for (let layer of comments_arr){
      for (let comment of layer) {
        comment_tree[comment.parent_id] ?
        comment_tree[comment.parent_id].push(comment) :
        comment_tree[comment.parent_id] = [comment];
      }
    }
  }
  
  makeRequest = (commentId, startIndex, limit) => {
    return axios ({
      method: 'GET',
      url: 'comments/' + commentId,
      params: { startIndex, limit },
    })
  }

  mapComments = (comments) => {
    return comments.map(comment => {
      let children_count = this.comment_tree[comment._id] ? this.comment_tree[comment._id].length : 0;
      return <Comment
        key={comment._id}
        id={comment._id}
        body={comment.body}
        handleData={this.handleCommentData}
        loadMore={children_count < comment.num_children ? this.handleLoadMore.bind(this, comment._id, children_count) : null} >
          {children_count
            ? this.mapComments(this.comment_tree[comment._id])
            : null}
      </Comment>
    });
  }

  handleCommentData = (commentId, status, data) => {
    switch (status) {
      case 'willMount':
        if (this.commentsData[commentId]) return this.commentsData[commentId];
        return { showTextBox: false, show: true, moreChildren: null };

      case 'willUnmount':
        return this.commentsData[commentId] = data;

      default:
        return { showTextBox: false, show: true, moreChildren: null };
    }
  }

  render() {
    let result;
    if(this.comment_tree[this.postId]) {
      result = this.mapComments(this.comment_tree[this.postId]);
    }
    return <>
      {result}
      {this.state.loading && <LinearProgress className={this.props.classes.loading} />}
    </>
  }
}

const mapStateToProps = state => {
  return {
  };
};

const mapDispatchToProps = dispatch => {
  return {
  };
};

export default  connect( mapStateToProps, mapDispatchToProps )(withStyles(styles)(Comments));