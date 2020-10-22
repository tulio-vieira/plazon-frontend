import React, { Component } from 'react';
import axios from '../../axios-instance';
import UserCard from './UserCard';
import Heading from '../UI/Heading';
import withErrorHandler from '../../hoc/withErrorHandler';
import { LinearProgress } from '@material-ui/core';
import Observer from '../Observer';
import { setPic } from '../../shared/utility';

const styles = (theme) => ({
  userList: {
    backgroundColor: theme.palette.background.front,
    marginBottom: theme.spacing(3),
    borderRadius: '0 0 10px 10px',
  }
});

class UserList extends Component {
  state = {
    users: [],
    loading: true,
    hasMore: true,
    pageNumber: 1,
  };

  componentDidMount() {
    this.makeRequest();
  }

  makeRequest() {
    axios({
      method: 'GET',
      url: '/users',
      params: { page: this.state.pageNumber },
    }).then(res => {
      if (!res) return;
      this.setState(prevState => {
        return {
          ...prevState,
          users: [...prevState.users, ...res.data.users],
          loading: false,
          hasMore: res.data.next ? true : false
        }
      })
    })
  }

  handleScroll = () => {
    this.setState(prevState => ({
      ...prevState,
      pageNumber: prevState.pageNumber + 1,
      loading: true
    }));
    this.makeRequest();
  }

  render() {
    const classes = this.props.classes;
    return <>
      <Heading variant='h6'>Following</Heading>
      <div className={classes.userList}>
        {this.state.users.map((user, index) => (
          <UserCard
            key={user._id}
            userId={user._id}
            divider={!(this.state.users.length === index + 1)}
            username={user.username}
            name={user.name}
            profile_pic={setPic(user.profile_pic)}
            description={user.description} >
            {(this.state.users.length === index + 1) && !this.state.loading && this.state.hasMore && <Observer hasBeenSeen={this.handleScroll}/>}
          </UserCard>
        ))}
        
        {this.state.loading && <LinearProgress />}
      </div >
    </>
  }
}

export default withErrorHandler(UserList, styles, axios);