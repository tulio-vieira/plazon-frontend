import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../axios-instance';

// meant to be used with withAuthGard
// input: onAuthFail, followed, userId (the id of the user being followed/unfollowed)
// output: displayFollowButton, followed, submitFollow
const withFollowSystem = ( WrappedComponent ) => {
  class FollowSystem extends Component {
    constructor(props) {
      super(props);
      this.state = {
        followed: props.followed || false
      };
    }
  
    submitFollow = () => {
      if (!this.props.token) return this.props.onAuthFail();
      this.setState(prevState => ({ followed: !prevState.followed }));
      axios({
        method: 'POST',
        url: '/users/' + this.props.userId,
        headers: { 'Authorization': 'Bearer ' + this.props.token },
      })
    }
  
    render() {
      return (
        <WrappedComponent
          {...this.props}
          displayFollowButton={this.props.userId !== this.props.currentUserId}
          followed={this.state.followed}
          submitFollow={this.submitFollow} />
      );
    }
  }

  const mapStateToProps = state => {
    return {
      token: state.auth.token,
      currentUserId: state.auth.currentUser ? state.auth.currentUser._id : null
    };
  };
  
  return connect( mapStateToProps )( FollowSystem );
}

export default withFollowSystem;