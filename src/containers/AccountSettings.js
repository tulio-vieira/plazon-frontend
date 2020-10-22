import React, { Component } from 'react';
import { capitalize, fade, LinearProgress, TextField, Typography, withStyles } from '@material-ui/core';
import CoverPhoto from '../components/CoverPhoto';
import WallpaperIcon from '@material-ui/icons/Wallpaper';
import BottomOptions from '../components/BottomOptions';
import Heading from '../components/UI/Heading';
import axios from '../axios-instance';
import { connect } from 'react-redux';
import * as actions from '../store/actions/index'
import { checkValidity } from '../shared/utility';
import Alert from '@material-ui/lab/Alert';

const styles = (theme) => ({
  container: {
    backgroundColor: theme.palette.background.front,
    padding: theme.spacing(3),
    borderRadius: '0 0 10px 10px',
  },
  wrapper: {
    border: '1px solid ' + theme.palette.text.secondary,
    borderRadius: 10,
    overflow: 'hidden',
  },
  userInfo: {
    display: 'flex',
    alignItems: 'flex-start',
    padding: '0 ' + theme.spacing(3) + 'px',
    paddingBottom: theme.spacing(3)
  },
  image: {
    height: 70,
    width: 70,
    borderRadius: '50%',
    marginBottom: theme.spacing(1)
  },
  textArea: {
    display: 'block',
    marginBottom: theme.spacing(1.5),
  },
  data: {
    marginBottom: theme.spacing(2),
    '& p': {
      wordBreak: 'break-word',
      fontSize: '1.1em',
      margin: '0.3em 0',
      color: theme.palette.text.secondary
    },
    '& p:first-child': {
      fontSize: '1.5em'
    }
  },
  profilePhoto: {
    position: 'relative',
    top: -30,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: theme.spacing(3),
    width: 100,
    textAlign: 'center',
    cursor: 'pointer'
  },
  resolution: {
    color: fade(theme.palette.text.primary, 0.6),
    fontSize: '0.9rem',
    margin: '0.3em 0'
  },
  changePic: {
    margin: '0.3em 0',
    '&:hover': {
      color: fade(theme.palette.text.primary, 0.8)
    }
  },
  profileForm: {
    flexGrow: 1
  },
  inlineInputs: {
    display: 'flex',
    marginBottom: theme.spacing(1),
  },
  firstInput: {
    marginRight: theme.spacing(1.5)
  },
  changeCover: {
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    padding: theme.spacing(3),
    color: 'white',
    '& p': {
      margin: '0.3em'
    },
    '& p:last-child': {
      color: 'rgba(255,255,255,0.6)',
      fontSize: '0.9rem',
    },
    '&:hover': {
      cursor: 'pointer',
      color: '#cccccc'
    }
  },
  coverIcon: {
    height: 80,
    width: 80,
    marginBottom: theme.spacing(1.5)
  },
  [theme.breakpoints.down('xs')]: {
    userInfo: {
      flexDirection: 'column',
      alignItems: 'center'
    },
    data: {
      textAlign: 'center',
      '& p': {
        fontSize: '1.1em'
      },
      '& p:last-child': {
        fontSize: '1em',
      },
    },
    profilePhoto: {
      marginTop: theme.spacing(1),
      marginRight: 0,
      top: 0
    },
    changeCover: {
      flexDirection: 'row',
      padding: theme.spacing(1),
      '& p , p:last-child': {
        fontSize: '0.8em',
      }
    },
    coverIcon: {
      marginBottom: 0
    },
  },
  [theme.breakpoints.down('sm')]: {
    coverIcon: {
      height: 40,
      width: 40,
    },
  }
});

class AccountSettings extends Component {
  constructor(props) {
    super(props);
    this.user = {};
    this.state = {
      formData: {
        name: {
          value: '',
          error: null
        },
        username: {
          value: '',
          error: null
        },
        description: {
          value: '',
          error: null
        },
        profile_pic: {
          address: null,
          file: null,
          filename: null,
        },
        banner_pic: {
          address: null,
          file: null,
          filename: null,
        }
      },
      serverErrors: [],
      serverInfo: [],
      loading: true
    };
  }

  componentDidMount() {
    axios.get('/users/' + this.props.userId)
    .then(res => {
      let newFormData = {};
      for (let key in this.state.formData) {
        if(key === 'profile_pic') break;
        newFormData[key] = {value: res.data.user[key], error: false} 
      }
      this.user = {name: res.data.user.name, username: res.data.user.username, description: res.data.user.description}
      this.setState({loading: false, formData: {...this.state.formData, ...newFormData}});
    })
    .catch(err => {
      this.errorHandler(err);
    });
  }

  errorHandler = (err) => {
    try {
      this.setState({loading: false, serverInfo: [], serverErrors: err.response.data.errors.map(error => error.msg)});
    } catch {
      this.setState({loading: false, serverInfo: [], serverErrors: ['Server error']});
    }
  }

  inputChangedHandler = (key, event) => {
    const newFormData = {[key]: {
      value: event.target.value,
      error: key === 'description' ? null : checkValidity(event.target.value, key)
    }};
    this.setState({formData: {...this.state.formData, ...newFormData}})
  }

  fileSelectedHandler = (pic_field, event) => {
    try {
      let ext = event.target.files[0].name.split('.');
      ext = ext[ext.length - 1];
      if (!['png', 'jpeg', 'jpg'].includes(ext)) return;
      const newFormData = {...this.state.formData, [pic_field]: {
        address: URL.createObjectURL(event.target.files[0]),
        file: event.target.files[0],
        filename: event.target.files[0].name.slice(0,30)
      }};
      this.setState({formData: newFormData});
    } catch {}
  }

  submitHandler = () => {
    let fd = new FormData();
    for (let key in this.state.formData) {
      if (key === 'profile_pic' || key ==='banner_pic') {
        if (!this.state.formData[key].file) continue;
        fd.append(key, this.state.formData[key].file);
      } else {
        fd.append(key, this.state.formData[key].value);
        if (this.state.formData[key].error) return;
      }
    }

    this.setState({loading: true});
    axios.post(
      `/users/${this.props.userId}`,
      fd,
      {headers: { Authorization: `Bearer ${this.props.token}` }}
    ).then(res => {
      // update refs to username, name and description
      this.user = {name: res.data.updatedUserFields.name, username: res.data.updatedUserFields.username, description: res.data.updatedUserFields.description};
      // reset files that were successfully uploaded
      // Setting them to null will mean that the new links from the redux state are rendered
      let updatedFormData = {...this.state.formData};
      ['profile_pic', 'banner_pic'].forEach(field => {
        if (res.data.updatedUserFields[field]) {
          updatedFormData[field] = {
            address: null,
            file: null,
            filename: null,
          };
        }
      });
      // update server errors
      let errors = [];
      if (res.data.errors) errors = res.data.errors.map(err => capitalize(err.msg));
      // update Server info messages
      let info = [];
      for (let key in res.data.updatedUserFields) {
        if (key === 'profile_pic') key = 'profile picture';
        if (key === 'banner_pic') key = 'banner picture';
        info.push(capitalize(key) + ' has been updated')
      }
      // update redux state of pictures, since pictures are used in other parts of the app
      this.props.updatePictures(res.data.updatedUserFields.profile_pic, res.data.updatedUserFields.banner_pic);
      // set state updates and loading to false
      this.setState({loading: false, formData: updatedFormData, serverErrors: errors, serverInfo: info});
    })
    .catch(err => {
      this.errorHandler(err);
    });
  }

  render() {
    const classes = this.props.classes;
    return (
      <>
        <Heading variant='h5'>Edit Profile</Heading>
        <div className={classes.container}>
          <div className={classes.wrapper}>

            {['profile_pic', 'banner_pic'].map(key => 
              <input
                key={key}
                style={{display: 'none'}}
                type='file'
                onChange={this.fileSelectedHandler.bind(this, key)}
                ref={fileInput => this[key] = fileInput}/>
            )}

            <CoverPhoto backgroundUrl={this.state.formData.banner_pic.address || this.props.banner_pic}>
              <div className={classes.changeCover} onClick={() => this.banner_pic.click()}>
                <WallpaperIcon className={classes.coverIcon} />
                <p>{this.state.formData.banner_pic.filename || 'Change Cover Photo'}</p>
                <p>{this.state.formData.banner_pic.file ? 'Click save to upload changes' : '1200px X 400px'}</p>
              </div>
            </CoverPhoto>

            <div className={classes.userInfo}>
              <div className={classes.profilePhoto} onClick={() => this.profile_pic.click()} >
                <img className={classes.image} src={this.state.formData.profile_pic.address || this.props.profile_pic} alt='' />
                <p className={classes.changePic}>{this.state.formData.profile_pic.filename || 'Change Profile Photo'}</p>
                <p className={classes.resolution}>{this.state.formData.profile_pic.file ? 'Click save to upload changes' : '200px X 200px'}</p>
              </div>

              <div className={classes.profileForm}>
                <div className={classes.data}>
                  <p>{this.user.name}</p>
                  <p>{'@' + this.user.username}</p>
                  <Typography>{this.user.description}</Typography>
                </div>
                <div className={classes.inlineInputs}>
                  <TextField disabled={this.state.loading} error={!!this.state.formData.name.error} helperText={this.state.formData.name.error} onChange={this.inputChangedHandler.bind(this, 'name')} InputLabelProps={{ shrink: true }} inputProps={{maxLength: 50}} className={classes.firstInput} fullWidth label="Name" value={this.state.formData.name.value} />
                  <TextField disabled={this.state.loading} error={!!this.state.formData.username.error} helperText={this.state.formData.username.error} onChange={this.inputChangedHandler.bind(this, 'username')} InputLabelProps={{ shrink: true }} inputProps={{maxLength: 50}} fullWidth label="Username" value={this.state.formData.username.value} />
                </div>
                <TextField
                  disabled={this.state.loading}
                  onChange={this.inputChangedHandler.bind(this, 'description')}
                  inputProps={{maxLength: 200}}
                  InputLabelProps={{ shrink: true }}
                  value={this.state.formData.description.value}
                  fullWidth
                  className={classes.textArea}
                  id="standard-multiline-static"
                  label="Describe yourself..."
                  multiline
                  rows={5}
                />
                <BottomOptions
                  mainButtonDisabled={this.state.loading}
                  mainButtonClicked={this.submitHandler}
                  mainButtonColor='secondary'
                  mainButtonText='Save'
                  message={(this.state.formData.description.value ? this.state.formData.description.value.length : 0) + '/200'} />

                {this.state.loading && <LinearProgress style={{marginTop: 8}} />}
                {this.state.serverErrors.map(errMessage => <Alert key={errMessage} style={{marginTop: 8}} severity="error">{errMessage}</Alert>)}
                {this.state.serverInfo.map(infoMessage => <Alert key={infoMessage} style={{marginTop: 8}} severity="success">{infoMessage}</Alert>)}
              
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    userId: state.auth.currentUser._id,
    profile_pic: state.auth.currentUser.profile_pic,
    banner_pic: state.auth.currentUser.banner_pic
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updatePictures: (profile_pic, banner_pic) => dispatch( actions.updatePictures(profile_pic, banner_pic) )
  };
};

export default connect( mapStateToProps, mapDispatchToProps )( withStyles(styles)(AccountSettings) );