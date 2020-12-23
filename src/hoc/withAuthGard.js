import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import * as actions from '../store/actions/index';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

export default function withAuthGard ( WrappedComponent ) {
  class AuthGard extends Component {
    state = { open: false };

    render() {
      return (
        <>
          <Dialog
            open={this.state.open}
            onClose={() => this.setState({open: false})}>
            <DialogTitle>You need to be logged in to do that!</DialogTitle>
            <DialogActions>
              <Link to='/register' style={{textDecoration: 'none'}}>
                <Button onClick={() => this.props.setAuthRedirectPath(this.props.location.pathname)} color="primary">
                  Register
                </Button>
              </Link>
              <Link to='/login' style={{textDecoration: 'none'}}>
                <Button onClick={() => this.props.setAuthRedirectPath(this.props.location.pathname)} color="primary" autoFocus>
                  Login
                </Button>
              </Link>
            </DialogActions>
          </Dialog>
          <WrappedComponent 
            {...this.props}
            token={this.props.token}
            userPic={this.props.userPic}
            onAuthFail={() => this.setState({ open: true })}
          />
        </>
      );
    }
  }
  
  const mapStateToProps = state => {
    return {
      token: state.auth.token,
      userPic: state.auth.currentUser.profile_pic
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
      setAuthRedirectPath: (path) => dispatch( actions.setAuthRedirectPath(path) )
    };
  };

  return connect( mapStateToProps, mapDispatchToProps )( withRouter( AuthGard ) );
}