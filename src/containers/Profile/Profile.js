import React, { Component } from 'react';
import ProfileTabs from './ProfileTabs';
import { capitalize, LinearProgress } from '@material-ui/core';
import withErrorHandler from '../../hoc/withErrorHandler';
import axios from '../../axios-instance';
import { Redirect, Route, Switch } from 'react-router';
import ProfileDashboard from './ProfileDashboard';
import UserList from '../UserList/UserList';
import PostList from '../PostList/PostList';
import { connect } from 'react-redux';
import CommentList from '../CommentList/CommentList';
import DashBoardWrapper from '../../components/UI/DashBoardWrapper';
import List from '../../components/UI/List';

class Profile extends Component {
  state = {
    loading: true,
    _id: null,
    name: null,
    username: null,
    description: null,
    profile_pic: null,
    banner_pic: null,
    date_created: null,
    followed: null,
    follower_count: 0,
    following_count: 0
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
    axios({
      method: 'GET',
      url: '/users/' + this.props.match.params.id,
      headers: { 'Authorization': 'Bearer ' + this.props.token },
    })
    .then(res => {
      if (!res) return;
      this.setState({
        ...res.data.user,
        loading: false
      });
    })
  }

  render() {
    const { location } = this.props;
    const url = this.props.match.url;

    const routes = this.props.location.pathname.split('/');
    const title = capitalize(routes[routes.length - 1]);

    return (
      this.state.loading ? 
      <LinearProgress style={{marginTop: 24}}/>
      :
      <>
        <DashBoardWrapper>
          <ProfileDashboard
            userId={this.state._id}
            followed={this.state.followed}
            name={this.state.name}
            username={this.state.username}
            profile_pic={this.state.profile_pic}
            banner_pic={this.state.banner_pic}
            date_created={this.state.date_created}
            description={this.state.description} />

          <ProfileTabs navLinks={[
              { title: 'Posts', to: 'posts' },
              { title: 'Comments', to: 'comments' },
              { title: this.state.follower_count + ' Followers', to: 'followers' },
              { title: this.state.following_count + ' Following', to: 'following' }
            ]} />
        </DashBoardWrapper>

        <List title={title} out={this.props.location.pathname.includes('posts')}>
          <Switch>
            <Route path={`${url}/posts`}
              render={() => <PostList url={location.pathname.replace('profile', 'users')} detail={true} />}/>
            <Route path={`${url}/comments`} 
              render={() => <CommentList username={this.state.username} userId={this.state._id} profile_pic={this.state.profile_pic} />} />
            <Route path={`${url}/following`}
              render={() => <UserList url={location.pathname.replace('profile', 'users')} /> }/>
            <Route path={`${url}/followers`}
              render={() => <UserList url={location.pathname.replace('profile', 'users')} /> }/>
            <Redirect to={`${url}/posts`} />
          </Switch>
        </List>
        
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token
  };
};

export default withErrorHandler( connect( mapStateToProps )( Profile ), null, axios);