import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Dialog, DialogContent, DialogContentText } from '@material-ui/core';
import ErrorPage from '../components/ErrorPage';

const withErrorHandler = (WrappedComponent, compStyles, axios) => {

  const styles = (theme) => {
    let styles = compStyles ? compStyles(theme) : {};
    return {
      paper: {
        position: 'absolute',
        top: '30%',
        left: 'calc(50% - 200px)',
        width: 400,
        wordWrap: 'break-word',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
      },
      ...styles
    }
  };

  class WithError extends Component {
    constructor(props) {
      super(props);
      this.state = { errMsg: null };
      this.reqInterceptor = axios.interceptors.request.use(req => {
        this.setState({ errMsg: null });
        return req;
      });
      this.resInterceptor = axios.interceptors.response.use(res => res, error => {
        try {
          this.setState({ errMsg: error.response.data.errors[0].msg });
        } catch {
          this.setState({ errMsg: error.message });
        }
        return Promise.reject(error);
      });
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }

    errorConfirmedHandler = () => {
      this.setState({ errMsg: null });
    }

    render() {

      return (
        this.state.errMsg === 'DOCUMENT_NOT_FOUND' ?
        <ErrorPage /> :
        <>
          <Dialog
            open={this.state.errMsg ? true : false}
            onClose={this.errorConfirmedHandler}>
            <DialogContent>
              <DialogContentText>
                {this.state.errMsg}
              </DialogContentText>
            </DialogContent>
          </Dialog>
          <WrappedComponent {...this.props} />
        </>
      );
    }
  }

  return withStyles(styles)(WithError)
}

export default withErrorHandler;