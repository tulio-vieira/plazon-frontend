import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../axios-instance';

// meant to be used with withAuthGard
const withLikeSystem = ( WrappedComponent, routeToSubmitLike ) => {
  class LikeSystem extends Component {
    constructor(props) {
      super(props);
      this.state = {
        like_count: props.like_count,
        dislike_count: props.dislike_count,
        liked: props.liked || 0
      };
    }
  
    likeHandler = (isLike) => {
      if (!this.props.token) return this.props.onAuthFail();
      this.submitLike(isLike);
      let newState = {...this.state, liked: isLike ? 1 : -1};
      if (newState.liked === this.state.liked) {
        newState.liked === 1 ? newState.like_count-- : newState.dislike_count--;
        newState.liked = 0;
      } else if (this.state.liked === 0) {
        newState.liked === 1 ? newState.like_count++ : newState.dislike_count++;
      } else {
        newState.like_count += newState.liked;
        newState.dislike_count -= newState.liked;
      }
      this.setState(newState);
    }

    submitLike = (isLike) => {
      axios({
        method: 'POST',
        url: routeToSubmitLike + '/' + this.props._id,
        headers: { 'Authorization': 'Bearer ' + this.props.token },
        data: { isLike },
      })
    }
  
    render() {
      return (
        <WrappedComponent
          {...this.props}
          liked={this.state.liked}
          token={this.props.token}
          userPic={this.props.userPic}
          like_count={this.state.like_count}
          dislike_count={this.state.dislike_count}
          likeHandler={this.likeHandler} />
      );
    }
  }

  const mapStateToProps = state => {
    return {
      token: state.auth.token,
      userPic: state.auth.currentUser.profile_pic
    };
  };
  
  return connect( mapStateToProps )( LikeSystem );
}

export default withLikeSystem;