import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Post from '../components/Post';
import Comments from '../components/Comments/Comments';

const styles = (theme) => ({
  postDetail: {

  }
});

class PostDetail extends Component {
  componentDidMount() {
    console.log(this.props.match.params.id);
  }

  render() {
    const classes = this.props.classes;

    return (
      <div className={classes.postDetail}>
        <Post />
        <Comments />
      </div>
    );
  }
}

export default withStyles(styles)(PostDetail);



