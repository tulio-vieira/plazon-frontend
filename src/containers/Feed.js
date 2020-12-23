import React, { Component } from 'react';
import CreatePost from '../components/CreatePost/CreatePost';
import axios from '../axios-instance';
import withErrorHandler from '../hoc/withErrorHandler';
import { connect } from 'react-redux';
import PostList from './PostList/PostList';
import withAuthGard from '../hoc/withAuthGard';

class Feed extends Component {
  state = {
    postsAdded: []
  };

  handlePostCreate = (newPost) => {
    return axios({
      method: 'POST',
      url: '/posts',
      headers: { 'Authorization': 'Bearer ' + this.props.token },
      data: newPost
    })
    .then(res => {
      res.data.author = {
        _id: res.data.author,
        profile_pic: this.props.profile_pic,
        name: this.props.name,
        username: this.props.username
      };
      this.setState({postsAdded: [res.data, ...this.state.postsAdded]});
    })
    .catch(err => {
      return Promise.reject(err);
    });
  }

  render() {
    return (
      <>
        <CreatePost
          onAuthFail={this.props.onAuthFail}
          postSubmitted={this.handlePostCreate}
          isAuthenticated={this.props.token !== null}
          profile_pic={this.props.profile_pic} />

        <PostList 
          postsAdded={this.state.postsAdded}
          url={'/posts'}
          detail={false}
          linkToProfile={true} />
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    profile_pic: state.auth.currentUser.profile_pic,
    name: state.auth.currentUser.name,
    username: state.auth.currentUser.username
  };
};

export default withErrorHandler( connect( mapStateToProps )( withAuthGard(Feed) ), null, axios);