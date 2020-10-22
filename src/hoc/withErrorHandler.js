import React, { Component } from 'react';
import Modal from '@material-ui/core/Modal';
import { withStyles } from '@material-ui/core/styles';

const withErrorHandler = (WrappedComponent, compStyles, axios) => {

  const styles = (theme) => {
    let styles = compStyles(theme);
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
      this.state = { error: null };
      this.reqInterceptor = axios.interceptors.request.use(req => {
        this.setState({ error: null });
        return req;
      });
      this.resInterceptor = axios.interceptors.response.use(res => res, error => {
        this.setState({ error });
        return Promise.reject(error);
      });
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }

    errorConfirmedHandler = () => {
      this.setState({ error: null });
    }

    render() {
      return (
        <>
          <Modal
            open={this.state.error ? true : false}
            onClose={this.errorConfirmedHandler}>
            <div className={this.props.classes.paper}>
              {this.state.error ? this.state.error.message : null}
            </div>
          </Modal>
          <WrappedComponent {...this.props} />
        </>
      );
    }
  }

  return withStyles(styles)(WithError)
}

export default withErrorHandler;