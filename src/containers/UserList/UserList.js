import React, { Component } from 'react';
import axios from '../../axios-instance';
import UserCard from './UserCard';
import { LinearProgress, withStyles } from '@material-ui/core';
import Observer from '../../components/Observer';
import withAuthGard from '../../hoc/withAuthGard';

const styles = (theme) => ({
  users: {
    backgroundColor: theme.palette.background.front,
  }
});

// takes in an url to make request for the users, and a title as props
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

  componentDidUpdate(prevProps) {
    if (this.props.url !== prevProps.url) {
      this.setState({ users: [], loading: true, hasMore: true, pageNumber: 1 });
      this.makeRequest();
    }
  }

  makeRequest() {
    axios({
      method: 'GET',
      url: this.props.url,
      headers: { Authorization: `Bearer ${this.props.token}` },
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
    const {classes, onAuthFail} = this.props;
    return (
      <div className={classes.users}>
        {this.state.users.map((user, index) => (
          <UserCard
            key={user._id}
            userId={user._id}
            divider={!(this.state.users.length === index + 1)}
            username={user.username}
            followed={user.followed}
            onAuthFail={onAuthFail}
            name={user.name}
            profile_pic={user.profile_pic}
            description={user.description} >
            {(this.state.users.length === index + 1) && !this.state.loading && this.state.hasMore && <Observer hasBeenSeen={this.handleScroll}/>}
          </UserCard>
        ))}
        
        {this.state.loading && <LinearProgress />}
      </div>
    );
  }
}

export default withAuthGard( withStyles(styles)(UserList) );