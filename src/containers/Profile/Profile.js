import React, { Component } from 'react';
import ProfileTabs from './ProfileTabs';
import { IconButton, LinearProgress } from '@material-ui/core';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import CoverPhoto from '../../components/CoverPhoto';
import withErrorHandler from '../../hoc/withErrorHandler';
import axios from '../../axios-instance';
import { connect } from 'react-redux';
import { convertDate, setPic } from '../../shared/utility';
import { Redirect, Route, Switch } from 'react-router';
import { Link } from 'react-router-dom';

const styles = (theme) => ({
  wrapper: {
    backgroundColor: theme.palette.background.mid,
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  userInfo: {
    display: 'flex',
    alignItems: 'flex-start',
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
  },
  image: {
    position: 'relative',
    top: -20,
    height: 105,
    width: 105,
    borderRadius: '50%',
    marginRight: theme.spacing(1.5),
  },
  data: {
    '& p': {
      margin: '0.3em',
      color: theme.palette.text.secondary
    }
  },
  settings: {
    alignSelf: 'center',
    marginLeft: 'auto'
  },

  [theme.breakpoints.down('xs')]: {
    userInfo: {
      flexDirection: 'column',
      alignItems: 'center'
    },
    settings: {
      margin: 'auto'
    },
    data: {
      textAlign: 'center'
    },
    image: {
      margin: 0,
      marginBottom: theme.spacing(1)
    }
  },
});

class Profile extends Component {
  state = {
    loading: true,
    name: null,
    username: null,
    description: null,
    profile_pic: null,
    banner_pic: null,
    date_created: null
  };

  componentDidMount() {
    this.makeRequest();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id === this.props.match.params.id) return;
    this.setState({loading: true});
    this.makeRequest();
  }

  makeRequest = () => {
    const { id } = this.props.match.params;
    axios.get('/users/' + id)
    .then(res => {
      if (!res) return;
      this.setState({
        ...res.data.user,
        profile_pic: setPic(res.data.user.profile_pic),
        banner_pic: setPic(res.data.user.banner_pic),
        date_created: convertDate(res.data.user.date_created),
        loading: false
      });
    })
  }

  render() {
    const classes = this.props.classes;
    const url = this.props.match.url;
    const { id } = this.props.match.params;

    return (
      this.state.loading ? 
      <LinearProgress style={{marginTop: 24}}/>
      :
      <div className={classes.wrapper}>

        <CoverPhoto backgroundUrl={this.state.banner_pic } />

        {!this.state.loading && <div className={classes.userInfo}>
          <img className={classes.image} src={this.state.profile_pic} alt='' />
          <div className={classes.data}>
            <p style={{ fontSize: '1.4em' }}>{this.state.name}</p>
            <p>{'@' + this.state.username}</p>
            <p style={{ marginBottom: '0.6em' }}>{'Joined ' + this.state.date_created}</p>
            <p style={{ marginBottom: '1em' }}>{this.state.description}</p>
          </div>
          {this.props.isAuthenticated && (this.props.currentUserId === id) &&
            <Link className={classes.settings} to='/settings'>
              <IconButton  aria-label="delete">
                  <SettingsOutlinedIcon />
              </IconButton>
            </Link>
          }
        </div>}
        <ProfileTabs />
        <Switch>
          <Route path={`${url}/posts`} render={() => <p>posts</p>}/>
          <Route path={`${url}/comments`} render={() => <p>Comments</p>}/>
          <Route path={`${url}/following`} render={() => <p>following</p>}/>
          <Route path={`${url}/followers`} render={() => <p>followers</p>}/>
          <Redirect to={`${url}/posts`} />
        </Switch>
      </div >
    );
  }
}

const mapStateToProps = state => {
  return {
      isAuthenticated: state.auth.token !== null,
      currentUserId: state.auth.currentUser && state.auth.currentUser._id
  };
};

export default connect(mapStateToProps)( withErrorHandler(Profile, styles, axios) );