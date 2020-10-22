import React, { Component } from 'react';
import { Button, capitalize, LinearProgress, TextField, Typography, withStyles } from '@material-ui/core';
import { Link, Redirect } from 'react-router-dom';
import Logo from '../../components/Logo';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import { checkValidity } from '../../shared/utility';
import Alert from '@material-ui/lab/Alert';
import * as actionTypes from '../../store/actions/actionTypes';

const styles = (theme) => ({
  login: {
    textAlign: 'center',
    backgroundColor: theme.palette.background.mid,
    padding: theme.spacing(3),
    maxWidth: 600,
    margin: theme.spacing(2) + 'px auto',
    borderRadius: 10
  },
  link: {
    display: 'inline-block',
    color: '#1395ff',
    cursor: 'pointer',
    marginTop: theme.spacing(1.5)
  },
  spaced: {
    marginTop: theme.spacing(2)
  },
  header: {
    margin: theme.spacing(2)
  }
});

class Auth extends Component {
  constructor(props){
    super(props);
    this.state = {controls: this.initializeState()};
    this.flashed = false;
  }

  initializeState() {
    let controls = {};
    let fields = [
      {name: 'email', label: 'E-mail', type: 'email', max: 200},
      {name: 'username', label: 'Username', type: 'username', max: 50},
      {name: 'name', label: 'Name', type: 'name', max: 50},
      {name: 'password', label: 'Password', type: 'password', max: 200},
      {name: 'confirmPassword', label: 'Confirm password', type: 'password', max: 200}
    ];
    if(!this.props.register) fields = [fields[0], fields[3]];
    for (let field of fields) {
      controls[field.name] = {
        type: field.type,
        label: field.label,
        max: field.max,
        value: '',
        error: null,
        touched: false
      }
    }
    return controls;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.register === this.props.register) return;
    this.setState({controls: this.initializeState()});
    (this.props.errors.length > 0) && this.props.clearErrors();
    if (!this.props.register) return;
    this.props.redirectMessage && this.props.clearRedirectMessage();
  }

  componentWillUnmount() {
    this.props.clearErrors();
  }

  inputChangedHandler = (key, event) => {
    let newControls = {[key]: {
      ...this.state.controls[key],
      value: event.target.value,
      touched: true,
      error: checkValidity(event.target.value, key)
    }};

    if ( this.props.register ) {
      if(key === 'confirmPassword') {
        newControls[key].error = (this.state.controls.password.value !== newControls[key].value)
          && this.state.controls.password.touched ? 'Passwords must match' : null;
      }
      if(key === 'password') {
        newControls.confirmPassword = {
          ...this.state.controls.confirmPassword,
          error: (this.state.controls.confirmPassword.value !== newControls[key].value)
            && newControls[key].touched ? 'Passwords must match' : null
        };
      }
    }

    this.setState({controls: {...this.state.controls, ...newControls}});
  }

  submitHandler = () => {
    let data = {};
    for (let key in this.state.controls) {
      data[key] = this.state.controls[key].value;
      // Check if there are any errors
      if (this.state.controls[key].error || !this.state.controls[key].touched) return;
    }
    delete data.confirmPassword;
    this.props.onAuth( data, this.props.register );
  }
  
  render() {
    const classes = this.props.classes;
    
    return (
      <div className={classes.login} >
        {(this.props.redirectMessage || this.props.isAuthenticated) && <Redirect to={this.props.authRedirectPath}/>}

        <div style={{ height: 50 }}>
          <Logo />
        </div>

        <Typography className={classes.header} variant='h6'>{this.props.register ? 'Create an Account' : 'Log In Plazon'}</Typography>

        {Object.keys(this.state.controls).map(key => {
          let control = this.state.controls[key];
          return <TextField
              disabled={this.props.loading}
              inputProps={{maxLength: control.max}}
              key={key}
              value={control.value}
              error={!!control.error && control.touched}
              helperText={control.touched && control.error}
              onChange={this.inputChangedHandler.bind(this, key)}
              fullWidth
              label={control.label}
              type={control.type}
              InputLabelProps={{ shrink: true }}
              className={classes.spaced} />
          })}

        <Button 
          disabled={this.props.loading}
          className={classes.spaced}
          onClick={this.submitHandler}
          color='primary'
          variant='contained'
          fullWidth>{this.props.register ? 'Register' : 'Login'}</Button>

        {!this.flashed && this.props.errors.map(err => (
          <Alert key={err.msg} className={classes.spaced} severity="error">{capitalize(err.msg)}</Alert>
        ))}
        {this.props.redirectMessage && <Alert className={classes.spaced} severity="info">{this.props.redirectMessage}</Alert>}
        {this.props.loading && <LinearProgress className={classes.spaced} />}
        {!this.props.register && <Link to='/register' className={classes.link}>Don't have an account? Register here</Link>}
      
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
      loading: state.auth.loading,
      errors: state.auth.errors,
      isAuthenticated: state.auth.token !== null,
      authRedirectPath: state.auth.authRedirectPath,
      redirectMessage: state.auth.redirectMessage,
  };
};

const mapDispatchToProps = dispatch => {
  return {
      onAuth: ( data, isRegister ) => dispatch( actions.auth( data, isRegister ) ),
      clearErrors: () => dispatch( { type: actionTypes.CLEAR_ERRORS } ),
      clearRedirectMessage: () => dispatch( { type: actionTypes.CLEAR_REDIRECT_MESSAGE } )
  };
};

export default connect( mapStateToProps, mapDispatchToProps )( withStyles(styles)(Auth) );