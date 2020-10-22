import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import { Input, Typography } from '@material-ui/core';
import BottomOptions from './BottomOptions';
import { DEFAULT_PROFILE_PIC } from '../shared/utility';

const styles = (theme) => ({
  createPost: {
    backgroundColor: theme.palette.background.mid,
    borderRadius: 16,
    padding: theme.spacing(3),
    paddingTop: theme.spacing(2),
    margin: theme.spacing(2) + 'px 0',
  },
  wrapper: {
    display: 'flex'
  },
  textArea: {
    fontSize: '1rem',
    width: '100%',
    flexGrow: 1,
    backgroundColor: theme.palette.background.front,
    color: theme.palette.type === 'dark' ? 'white' : 'black',
    borderRadius: '0 0 25px 25px',
    border: 'none',
    outline: 'none',
    resize: 'none',
    height: 150,
    padding: theme.spacing(2),
    fontFamily: 'inherit',
  },
  image: {
    borderRadius: '50%',
    width: 60,
    height: 60,
    marginRight: theme.spacing(2)
  },
  title: {
    borderRadius: '25px 25px 25px 25px',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.front,
    padding: theme.spacing(2),
    paddingBottom: theme.spacing(1),
    fontSize: '1.1em',
    zIndex: 10,
  },
  titleFocus: {
    borderRadius: '25px 25px 0 0',
  },
  messageClass: {
    color: theme.palette.success.light
  },
  [theme.breakpoints.down('xs')]: {
    wrapper: {
      flexDirection: 'column',
      alignItems: 'center',
    },
    image: {
      marginRight: 0,
      marginBottom: theme.spacing(2)
    }
  },
});

class CreatePost extends Component {
  state = {
    title: '',
    body: '',
    show: false,
    touched: false,
  };

  handleFocusIn = () => {
    this.setState({ show: true });
  }

  handleFocusOut = () => {
    this.setState({ show: false });
  }

  handleText = (field, event) => {
    this.setState({[field]: event.target.value, touched: true});
  }

  submitHandler = () => {
    if (this.state.title === '') return this.setState({touched: true});
    if (!this.props.isAuthenticated) this.props.onAuthFail('You need to be logged in to write a post');
    this.props.postSubmitted(this.state.title, this.state.body);
    this.setState({ title: '', body: '', show: false, touched: false });
  }

  render() {
    const classes = this.props.classes;
    return (
      <div className={classes.createPost}>
        <Typography style={{ marginBottom: '0.7em', fontWeight: 'lighter' }} variant='h6'>What's on your mind?</Typography>
        <div className={classes.wrapper}>
          <img className={classes.image} src={this.props.profile_pic || DEFAULT_PROFILE_PIC} alt="" />
          <div style={{ width: '100%' }}>
            <Input
              maxLength={100}
              error={this.state.touched && this.state.title === ''}
              onClick={this.handleFocusIn}
              className={classes.title + ' ' + (this.state.show ? classes.titleFocus : '')}
              fullWidth
              placeholder='Title (required)'
              onChange={this.handleText.bind(this, 'title')}
              value={this.state.title} />
            {this.state.show ?
              <>
                <textarea
                  maxLength={300}
                  value={this.state.body}
                  placeholder="Text (optional)"
                  onChange={this.handleText.bind(this, 'body')}
                  className={classes.textArea} />
                <BottomOptions
                  mainButtonClicked={this.submitHandler}
                  mainButtonDisabled={this.props.loading}
                  handleCanceled={this.handleFocusOut}
                  mainButtonColor='secondary'
                  mainButtonText='Post'
                  messageClass={classes.messageClass}
                  message={(300 - this.state.body.length) + ' characters remaining'} />
              </>
              : null}
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(CreatePost);