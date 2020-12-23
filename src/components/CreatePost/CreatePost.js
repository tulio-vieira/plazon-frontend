import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import { IconButton, Input, Tooltip, Typography } from '@material-ui/core';
import BottomOptions from '../BottomOptions';
import { DEFAULT_PROFILE_PIC, VIDEO_VALIDATORS } from '../../shared/utility';
import CropOriginalIcon from '@material-ui/icons/CropOriginal';
import EmbedContentDialog from './EmbedContentDialog';
import ContentPreview from './ContentPreview';

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
    height: 60
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
  container: {
    display: 'flex',
    flexDirection: 'column',
    marginRight: theme.spacing(2),
    alignItems: 'center'
  },
  icon: {
    marginTop: 50,
    color: '#81c784'
  },
  [theme.breakpoints.down('xs')]: {
    wrapper: {
      flexDirection: 'column',
      alignItems: 'center'
    },
    icon: {
      margin: 0
    },
    image: {
      margin: '0 auto'
    },
    container: {
      flexDirection: 'row',
      width: '100%',
      alignItems: 'flex-end',
      margin: theme.spacing(0,0,2,0)
    }
  }
});

class CreatePost extends Component {
  state = {
    title: '',
    body: '',
    show: false,
    showDialog: false,
    touched: false,
    loading: false,
    urlSubmitted: null,
    urlTransformed: null,
    isVideo: false
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

  // add urlTransformed to this handler
  submitHandler = async () => {
    if (this.state.title === '') return this.setState({touched: true});
    if (!this.props.isAuthenticated) return this.props.onAuthFail();
    this.setState({ loading: true });
    let newPost = {title: this.state.title, body: this.state.body};
    if (this.state.urlTransformed) {
      newPost.contentUrl = this.state.urlTransformed;
      newPost.isVideo = this.state.isVideo
    }
    try {
      await this.props.postSubmitted(newPost);
      this.setState({ title: '', body: '', show: false, touched: false, loading: false });
    } catch(err) {
      this.setState({ loading: false });
    }
  }

  handleDialog = () => {
    this.setState(prevState => ({showDialog: !prevState.showDialog }))
  }

  handleLinkSubmitted = (urlSubmitted) => {
    if (urlSubmitted.length === 0) return this.clearContentLink();
    let urlTransformed = urlSubmitted.trim();
    let isVideo = false;
    for (let validator of VIDEO_VALIDATORS) {
      const matchArr = urlTransformed.match(validator.regex);
      if (!matchArr) continue;
      urlTransformed = validator.embedUrl + matchArr[1];
      isVideo = true;
      break;
    }
    this.setState({ showDialog: false, urlSubmitted, urlTransformed, isVideo });
  }

  clearContentLink = () => {
    this.setState({ showDialog: false, urlSubmitted: null, urlTransformed: null });
  }

  render() {
    const classes = this.props.classes;
    return (
      <div className={classes.createPost}>
        <Typography style={{ marginBottom: '0.7em', fontWeight: 'lighter' }} variant='h6'>What's on your mind?</Typography>
        <div className={classes.wrapper}>
          
          <div className={classes.container}>
            <img className={classes.image} src={this.props.profile_pic || DEFAULT_PROFILE_PIC} alt="" />
            {this.state.show && 
              <Tooltip title="Embed content">
                <IconButton className={classes.icon} onClick={this.handleDialog}>
                  <CropOriginalIcon/>
                </IconButton>
              </Tooltip>
            }
          </div>

          <div style={{ width: '100%' }}>
            <Input
              disabled={this.state.loading}
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
                  disabled={this.state.loading}
                  maxLength={300}
                  value={this.state.body}
                  placeholder="Text (optional)"
                  onChange={this.handleText.bind(this, 'body')}
                  className={classes.textArea} />
                <BottomOptions
                  mainButtonClicked={this.submitHandler}
                  mainButtonDisabled={this.state.loading}
                  handleCanceled={this.handleFocusOut}
                  mainButtonColor='secondary'
                  mainButtonText='Post'
                  messageClass={classes.messageClass}
                  message={(300 - this.state.body.length) + ' characters remaining'} />
              </>
              : null}
          </div>
        </div>

        {this.state.show && this.state.urlTransformed && 
          <ContentPreview
            contentUrl={this.state.urlTransformed}
            isVideo={this.state.isVideo}
            onClear={this.clearContentLink} />
        }

        <EmbedContentDialog
          onClose={this.handleDialog}
          onSubmit={this.handleLinkSubmitted}
          defaultValue={this.state.urlSubmitted}
          open={this.state.showDialog} />

      </div>
    );
  }
}

export default withStyles(styles)(CreatePost);