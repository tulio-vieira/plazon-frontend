import React, { Component } from 'react';
import ProfileTabs from './Profile/ProfileTabs';
import DashBoardWrapper from '../components/UI/DashBoardWrapper';
import List from '../components/UI/List';
import { capitalize } from '@material-ui/core';
import { Redirect, Route, Switch } from 'react-router';
import UserList from './UserList/UserList';
import PostList from './PostList/PostList';
import axios from '../axios-instance';
import withErrorHandler from '../hoc/withErrorHandler';

class Search extends Component {
  render() {
    const url = this.props.match.url;
    const routes = this.props.location.pathname.split('/');
    const title = capitalize(routes[routes.length - 1]);
    return (
      <>
        <DashBoardWrapper>
          <ProfileTabs
            navLinks={[
              { title: 'Users', to: 'users' + this.props.location.search },
              { title: 'Posts', to: 'posts' + this.props.location.search }
            ]} />
        </DashBoardWrapper>
        
        <List title={title} out={this.props.location.pathname.includes('posts')}>
          {
            <Switch>
              <Route path={`${url}/users`}
                render={() => <UserList url={'/users' + this.props.location.search} />} />
              <Route path={`${url}/posts`}
                render={() => <PostList url={'/posts' + this.props.location.search} detail={true} />}/>
              <Redirect to={`${url}/users`} />
            </Switch>
          }
        </List>

      </>
    );
  }
}

export default withErrorHandler(Search, null, axios);