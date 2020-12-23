import React, { Component } from 'react';
import axios from '../../axios-instance';
import { LinearProgress } from '@material-ui/core';
import Observer from '../../components/Observer';
import { connect } from 'react-redux';
import CommentListing from './CommentListing';
import { withRouter } from 'react-router';

// takes in url, detail and addedPosts (optional)
class CommentList extends Component {
  state = {
    comments: [],
    loading: true,
    hasMore: true,
    pageNumber: 1,
  };

  componentDidMount() {
    this.makeRequest();
  }

  componentDidUpdate(prevProps) {
/*     if (this.props.match.url !== prevProps.match.url) {
      this.setState({ posts: [], loading: true, hasMore: true, pageNumber: 1 });
      this.makeRequest();
    } */
  }

  makeRequest() {
    axios({
      method: 'GET',
      url: this.props.location.pathname.replace('profile', 'users'),
      headers: { 'Authorization': 'Bearer ' + this.props.token },
      params: { page: this.state.pageNumber },
    })
    .then(res => {
      if (!res) return;
      this.setState(prevState => {
        return {
          ...prevState,
          comments: [...prevState.comments, ...res.data.comments],
          loading: false,
          hasMore: res.data.next ? true : false
        }
      })
    })
  }

  handleScroll = () => {
    this.setState(prevState => ({
      ...prevState,
      pageNumber: prevState.pageNumber + 1,
      loading: true
    }));
    this.makeRequest();
  }

  render() {
    const { username, userId, profile_pic } = this.props;
    return (
      <>
        {this.state.comments.map((comment, index) => {
          return <CommentListing
            key={comment._id}
            comment_id={comment._id}
            post_id={comment.post_id._id}
            post_author_id={comment.post_id.author}
            post_author_profile_pic={comment.post_id.profile_pic}
            post_author_username={comment.post_id.username}
            post_title={comment.post_id.title}
            comment_count={comment.post_id.comment_count}
            post_date={comment.post_id.date_formatted}
            body={comment.body}
            date={comment.date_formatted}
            like_count={comment.like_count}
            dislike_count={comment.dislike_count}
            liked={comment.liked}
            depth={comment.depth}
            username={username}
            author_id={userId}
            profile_pic={profile_pic} >
                {(this.state.comments.length === index + 1) && !this.state.loading && this.state.hasMore && <Observer hasBeenSeen={this.handleScroll}/>}
          </CommentListing>
        })}
        {this.state.loading && <LinearProgress />}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token
  };
};

export default connect( mapStateToProps )( withRouter(CommentList) );