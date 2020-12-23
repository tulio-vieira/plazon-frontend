import React, { Component } from 'react';
import List from '../components/UI/List';
import UserList from './UserList/UserList';
import axios from '../axios-instance';
import withErrorHandler from '../hoc/withErrorHandler';

const styles = (theme) => ({
  discover: {
    marginTop: theme.spacing(2)
  }
})

class Discover extends Component {
  render() {
    return (
      <div className={this.props.classes.discover}>
        <List title='Discover Users'>
          <UserList url='/users' />
        </List>
      </div>   
    );
  }
}

export default withErrorHandler(Discover, styles, axios);