import React, { Component } from 'react';
import Post from '../components/Post';
import CreatePost from '../components/CreatePost';
import axios from '../axios-instance';
import { LinearProgress } from '@material-ui/core';
import withErrorHandler from '../hoc/withErrorHandler';
import Observer from '../components/Observer';
import { setPic } from '../shared/utility';
import { connect } from 'react-redux';
import * as actions from '../store/actions/index';

const styles = (theme) => ({
  loading: {
    marginBottom: theme.spacing(2)
  }
});

class Feed extends Component {
  state = {
    posts: [],
    loading: true,
    hasMore: true,
    pageNumber: 1,
  };

  componentDidMount() {
    this.makeRequest();
  }

  makeRequest() {
    axios({
      method: 'GET',
      url: '/posts',
      headers: { 'Authorization': 'Bearer ' + this.props.token },
      params: { page: this.state.pageNumber },
    }).then(res => {
      if (!res) return;
      this.setState(prevState => {
        return {
          ...prevState,
          posts: [...prevState.posts, ...res.data.posts],
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

  likeHandler = (post_id, isLike) => {
    axios({
      method: 'POST',
      url: '/posts/' + post_id,
      headers: { 'Authorization': 'Bearer ' + this.props.token },
      data: { isLike },
    })
  }

  handleAuthFail = (msg) => {
    this.props.history.push('/login');
    this.props.onAuthFail([{msg}]);
    this.props.setAuthRedirectPath('/');
  }

  handlePostCreate = (title, body) => {
    this.setState({loading: true});
    axios({
      method: 'POST',
      url: '/posts',
      headers: { 'Authorization': 'Bearer ' + this.props.token },
      data: { title, body }
    })
    .then(res => {
      debugger;
      res.data.author = {
        _id: res.data.author,
        profile_pic: this.props.profile_pic,
        name: this.props.name,
        username: this.props.username
      };
      this.setState({loading: false, posts: [res.data, ...this.state.posts]});
    })
    .catch(err => {
      console.log(err);
    });
  }

  render() {
    return (
      <>
        <CreatePost
          onAuthFail={this.handleAuthFail}
          postSubmitted={this.handlePostCreate}
          isAuthenticated={this.props.token !== null}
          profile_pic={this.props.profile_pic} />
        {this.state.posts.map((post, index) => {
          return <Post
              key={post._id}
              author_id={post.author._id}
              post_id={post._id}
              profile_pic={setPic(post.author.profile_pic)}
              name={post.author.name}
              username={post.author.username}
              comment_count={post.comment_count}
              dislike_count={post.dislike_count}
              like_count={post.like_count}
              isAuthenticated={this.props.token !== null}
              title={post.title}
              body={post.body}
              liked={post.liked}
              date={post.date_formatted}
              onAuthFail={this.handleAuthFail}
              rated={this.likeHandler.bind(this, post._id)}>
                {(this.state.posts.length === index + 1) && !this.state.loading && this.state.hasMore && <Observer hasBeenSeen={this.handleScroll}/>}
            </Post>
        })}
        {this.state.loading && <LinearProgress className={this.props.classes.loading} />}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    profile_pic: state.auth.currentUser.profile_pic,
    name: state.auth.currentUser.name,
    username: state.auth.currentUser.username
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuthFail: (errArr) => dispatch( actions.authFail(errArr) ),
    setAuthRedirectPath: (path) => dispatch( actions.setAuthRedirectPath(path) )
  };
};

export default withErrorHandler(connect( mapStateToProps, mapDispatchToProps )( Feed ), styles, axios);