import React, { Component } from 'react';
import CreateComment from './CreateComment';

export default class StatefulCreateComment extends Component {
  initialState = {
    value: '',
    loading: false,
    touched: false
  }
  state = this.initialState;
  
  componentDidUpdate(prevProps) {
    if (prevProps.renderSwitch !== this.props.renderSwitch) this.setState(this.initialState);
  }

  commentControl = (e) => {
    this.setState({ value: e.target.value, touched: true });
  }

  postNewComment = () => {
    if (this.state.value === '') return;
    if (this.props.handleAuthFail) return this.props.handleAuthFail();
    this.setState({ loading: true });
    this.props.postNewComment(this.state.value)
  }

  render () {
    return <CreateComment
      userPic={this.props.userPic}
      disabled={this.state.loading}
      value={this.state.value}
      error={this.state.touched && this.state.value === ''}
      onChange={this.commentControl}
      replyClicked={this.postNewComment} />
  }
}