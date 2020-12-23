import React, { Component } from 'react';
import Post from './Post';
import axios from '../../axios-instance';
import { LinearProgress, withStyles } from '@material-ui/core';
import Observer from '../../components/Observer';
import withAuthGard from '../../hoc/withAuthGard';

const styles = (theme) => ({
  loading: {
    marginBottom: theme.spacing(2)
  }
});

// takes in url, detail and addedPosts (optional)
class PostList extends Component {
  state = {
    posts: [],
    loading: true,
    hasMore: true,
    pageNumber: 1,
  };

  componentDidMount() {
    this.makeRequest();
  }

  componentDidUpdate(prevProps) {
    if (this.props.url !== prevProps.url) {
      this.setState({ posts: [], loading: true, hasMore: true, pageNumber: 1 });
      this.makeRequest();
    }
  }

  makeRequest() {
    axios({
      method: 'GET',
      url: this.props.url,
      headers: { 'Authorization': 'Bearer ' + this.props.token },
      params: { page: this.state.pageNumber },
    })
    .then(res => {
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

  render() {
    const {classes, onAuthFail, postsAdded, linkToProfile } = this.props;
    const posts = postsAdded ? postsAdded.concat(this.state.posts) : this.state.posts;
    return (
      <>
        {posts.map((post, index) => {
          return <Post
              detail={false}
              key={post._id}
              author_id={post.author._id}
              _id={post._id}
              onAuthFail={onAuthFail}
              profile_pic={post.author.profile_pic}
              name={post.author.name}
              username={post.author.username}
              comment_count={post.comment_count}
              dislike_count={post.dislike_count}
              like_count={post.like_count}
              liked={post.liked}
              title={post.title}
              body={post.body}
              date={post.date_formatted}
              linkToProfile={linkToProfile}
              contentUrl={post.contentUrl}
              isVideo={post.isVideo} >
                {(posts.length === index + 1) && !this.state.loading && this.state.hasMore && <Observer hasBeenSeen={this.handleScroll}/>}
            </Post>
        })}
        {this.state.loading && <LinearProgress className={classes.loading} />}
      </>
    );
  }
}

export default withAuthGard( withStyles(styles)(PostList) );