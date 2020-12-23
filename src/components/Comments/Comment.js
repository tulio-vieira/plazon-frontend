import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import { LinearProgress } from '@material-ui/core';
import CreateComment from './CreateComment';
import withLikeSystem from '../../hoc/withLikeSystem';
import LinkThread from './LinkThread';
import CommentData from './CommentData';

const styles = (theme) => ({
  spacer: {
    marginTop: -theme.spacing(3.5),
    marginBottom: theme.spacing(2),
    minWidth: 32,
    [theme.breakpoints.down(350)]: {
      minWidth: 20
    },
    '&:hover': {
      '& div': {
        backgroundColor: theme.palette.primary.main
      }
    }
  },
  verticalLine: {
    backgroundColor: theme.palette.primary.light,
    height: '100%',
    margin: '0 auto',
    width: 2
  },
  loading: {marginBottom: theme.spacing(1)}
});

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = this.props.handleData(this.props._id, 'willMount');
    this.state.loading = false;
    this.state.touched = false;
    this.submitted = false;
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.children !== this.props.children ||
      this.props.classes !== nextProps.classes ||
      this.props.like_count !== nextProps.like_count ||
      this.props.dislike_count !== nextProps.dislike_count ||
      this.props.liked !== nextProps.liked ||
      Object.keys(this.state).reduce((acc, key) => (acc || this.state[key] !== nextState[key]), false)
    );
  }

  componentDidUpdate(prevProps){
    if (prevProps.children !== this.props.children) {
      if (this.submitted) {
        this.setState({touched: false, showTextBox: false, newComment: '', loading: false});
        this.submitted = false;
      } else {
        this.setState({loading: false});
      }
    }
  }

  handleLoadMore = () => {
    this.setState({loading: true});
    this.props.loadMore();
  }

  componentWillUnmount() {
    this.props.handleData(this.props._id, 'willUnmount', this.state);
  }

  handleShowTextBox = () => {
    this.setState(prevState => ({ showTextBox: !prevState.showTextBox }));
  }

  openShowMore = () => {
    this.setState({show: true});
  }

  closeShowMore = () => {
    this.setState({show: false});
  }

  postNewComment = () => {
    if (this.state.newComment === '') return;
    this.setState({loading: true});
    this.submitted = true;
    this.props.postNewComment(this.state.newComment);
  }

  commentControl = (e) => {
    this.setState({ newComment: e.target.value, touched: true });
  }

  render() {
    const {
      profile_pic,
      likeHandler,
      like_count,
      dislike_count,
      liked,
      author_id,
      username,
      date,
      body,
      classes,
      loadMore,
      continueThread } = this.props;

    const children = this.props.children && this.props.children.length > 0 ? this.props.children : null;

    return (
      <div style={{ width: '100%' }}>
 
        <CommentData
          like_count={like_count}
          dislike_count={dislike_count}
          liked={liked}
          likeHandler={likeHandler}
          profile_pic={profile_pic}
          author_id={author_id}
          username={username}
          body={body}
          date={date}
          onReplyClicked={this.handleShowTextBox} />

        <div style={{ display: 'flex' }}>

          <div onClick={this.state.show && children ? this.closeShowMore : null}
            className={classes.spacer} style={(this.state.show && children) ? {cursor: 'pointer'} : null} >
            { this.state.show && children && <div className={classes.verticalLine} /> }
          </div>

          <div style={{flexGrow: 1}}>

            {this.state.showTextBox &&
              <CreateComment
                handleAuthFail={this.props.token ? null : this.props.onAuthFail}
                userPic={this.props.userPic}
                disabled={this.state.loading}
                value={this.state.newComment}
                error={this.state.touched && this.state.newComment === ''}
                onChange={this.commentControl}
                replyClicked={this.postNewComment}
                textBoxClosed={this.handleShowTextBox} />
            }

            {children && !this.state.show && <LinkThread onClick={this.openShowMore} >Show More</LinkThread>}
            {this.state.show ? children : null}
            {continueThread && this.state.show && <LinkThread to={continueThread} forward >Continue Thread</LinkThread>}
            {loadMore && this.state.show && <LinkThread onClick={this.handleLoadMore} >Load More</LinkThread>}
            {this.state.loading && <LinearProgress className={classes.loading}/>}

          </div>

        </div>

      </div>
    );
  }
}

export default withLikeSystem( withStyles(styles)(Comment), '/comments' );


