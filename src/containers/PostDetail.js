import React, { Component } from 'react';
import Post from './PostList/Post';
import Comments from '../components/Comments/Comments';
import axios from '../axios-instance';
import { LinearProgress } from '@material-ui/core';
import withErrorHandler from '../hoc/withErrorHandler';
import LoadingModal from '../components/UI/LoadingModal';
import withAuthGard from '../hoc/withAuthGard';

const styles = (theme) => ({
  loading: {
    marginTop: theme.spacing(2),
  },
  postDetail: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative'
  }
});

class PostDetail extends Component {
  state = {
    initialLoading: true,
    loading: false,
    post: {},
    comments: [],
    commentId: this.props.match.params.commentId,
  };
  maxDepth = 4;
  limit = 5;

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.commentId !== this.props.match.params.commentId) {
      this.setState({ loading: true });
      const rootId = this.props.match.params.commentId || this.props.match.params.postId;
      this.getComments(rootId, 0, 0, this.props.match.params.commentId ? true : false)
      .then(res => { 
        this.setState({
          comments: res.data.comments,
          commentId: this.props.match.params.commentId,
          loading: false
        });
      })
      .catch(err => {console.log(err)});
    }
  }

  componentDidMount() {
    const withComments = !this.props.match.params.commentId;
    Promise.all([
      axios({
        method: 'GET',
        url: '/posts/' + this.props.match.params.postId,
        headers: { 'Authorization': 'Bearer ' + this.props.token },
        params: { withComments, limit: this.limit, depth: this.maxDepth }
      }),
      withComments ? null : this.getComments(this.props.match.params.commentId, 0, 0, true)
    ])
    .then(resultsArr => {
      this.setState({
        initialLoading: false,
        post: resultsArr[0].data.post,
        comments: resultsArr[withComments ? 0 : 1].data.comments
      });
    })
    .catch(err => {
      console.log(err);
    })
  }

  getComments(commentId, startIndex, startDepth, withParent) {
    return axios ({
      method: 'GET',
      url: 'comments/' + commentId,
      headers: { 'Authorization': 'Bearer ' + this.props.token },
      params: { startIndex, limit: this.limit, startDepth, withParent, depth: this.maxDepth }
    })
  }

  handleLoadMore = (commentId, startIndex, startDepth, withParent) => {
    this.getComments(commentId, startIndex, startDepth, withParent)
    .then(res => {
      this.setState({ comments: res.data.comments });
    })
    .catch(err => {
      console.log(err);
    })
  }

  render() {
    const classes = this.props.classes;
    const post = this.state.post;
    return (
      this.state.initialLoading ? <LinearProgress className={classes.loading} /> :
      <div className={classes.postDetail}>
        <LoadingModal show={this.state.loading}/>
        <Post
          _id={post._id}
          onAuthFail={this.props.onAuthFail}
          detail={true}
          author_id={post.author._id}
          profile_pic={post.author.profile_pic}
          name={post.author.name}
          username={post.author.username}
          comment_count={post.comment_count}
          dislike_count={post.dislike_count}
          like_count={post.like_count}
          title={post.title}
          body={post.body}
          liked={post.liked}
          date={post.date_formatted}
          contentUrl={post.contentUrl}
          isVideo={post.isVideo}
          linkToProfile={true} />
        <Comments
          rootId={this.state.commentId || post._id}
          userPic={this.props.userPic}
          token={this.props.token}
          onAuthFail={this.props.onAuthFail}
          post_num_children={post.num_children}
          postId={this.state.post._id}
          maxDepth={this.maxDepth}
          comments={this.state.comments}
          handleLoadMore={this.handleLoadMore} />
      </div>
    );
  }
}


export default withErrorHandler( withAuthGard(PostDetail) , styles, axios);