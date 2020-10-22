import React, { Component } from 'react';
import ArrowUpwardRoundedIcon from '@material-ui/icons/ArrowUpwardRounded';
import ArrowDownwardRoundedIcon from '@material-ui/icons/ArrowDownwardRounded';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/styles';
import { Input } from '@material-ui/core';
import { LinearProgress } from '@material-ui/core';

const styles = (theme) => ({
  commentThread: {
    display: 'flex',
  },
  spacer: {
    flexGrow: 1,
    width: theme.spacing(4),
    '&:hover': {
      cursor: 'pointer',
      '& div': {
        backgroundColor: theme.palette.primary.main
      }
    }
  },
  commentUtil: {
    display: 'flex',
    flexDirection: 'column'
  },
  commentData: {
    marginBottom: theme.spacing(1.5)
  },
  verticalLine: {
    backgroundColor: theme.palette.primary.light,
    height: 'calc(100% - ' + theme.spacing(1) + 'px)',
    margin: '0 auto',
    width: 2
  },
  image: {
    height: theme.spacing(4),
    width: theme.spacing(4),
    marginRight: theme.spacing(1),
    borderRadius: '50%',
  },
  username: {
    margin: 0,
    fontSize: '0.9em',
    color: theme.palette.type === 'dark' ? '#acacac' : '#494949'
  },
  rating: {
    margin: 0,
    fontSize: '0.8em',
    marginLeft: -theme.spacing(1)
  },
  content: {
    margin: '0.1em 0'
  },
  showMore: {
    position: 'relative',
    top: -theme.spacing(1.5),
    display: 'inline-block',
    color: theme.palette.primary.light,
    '&:hover': {
      textDecoration: 'underline'
    },
    cursor: 'pointer',
    fontSize: '0.9em',
  },
  reply: {
    display: 'flex',
    marginBottom: theme.spacing(2),
    marginTop: -theme.spacing(1)
  },
  replyButton: {
    textTransform: 'capitalize',
    marginTop: theme.spacing(0.3),
    marginLeft: theme.spacing(0.3),
    float: 'right'
  }
});

const photo = 'https://parler.com/assets/default-images/par-default-profile-picture.jpg';

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = this.props.handleData(this.props.id, 'willMount');
    this.state.loading = false;
  }

  componentDidUpdate(prevProps, prevState){
    if (prevProps.children !== this.props.children) this.setState({loading: false});
  }

  handleLoadMore = () => {
    this.setState({loading: true});
    this.props.loadMore();
  }

  componentWillUnmount() {
    this.props.handleData(this.props.id, 'willUnmount', this.state);
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

  render() {
    const {
      body,
      children,
      classes,
      loadMore } = this.props;

    return (
      <div className={classes.commentThread}>
        <div className={classes.commentUtil}>
          <img className={classes.image} src={photo} alt='' />
          {(this.state.show && children) ?
            <div onClick={this.closeShowMore} className={classes.spacer}>
              <div className={classes.verticalLine} />
            </div> : null
          }
        </div>
        <div style={{ width: '100%' }}>
          <div className={classes.commentData}>
            <p className={classes.username}>@tulioVieira</p>
            <p className={classes.content} >{body}</p>
            <p className={classes.rating}>
              <IconButton size='small'><ArrowUpwardRoundedIcon fontSize='small' /></IconButton>110
                <IconButton size='small'><ArrowDownwardRoundedIcon fontSize='small' /></IconButton>132
                <Button
                color="secondary"
                size='small'
                style={{ textTransform: 'capitalize' }}
                onClick={this.handleShowTextBox}>Reply</Button>
            </p>
          </div>
          {this.state.showTextBox ?
            <div className={classes.reply}>
              <img className={classes.image} src={photo} alt='' />
              <div style={{ width: '100%' }}>
                <Input fullWidth placeholder='Add reply...' multiline />
                <div />
                <Button variant="contained" disableElevation color='secondary' className={classes.replyButton} size='small'>Reply</Button>
                <Button variant="contained" disableElevation color='primary' className={classes.replyButton} size='small' onClick={this.handleShowTextBox} >Cancel</Button>
              </div>
            </div>
            : null}
          {children && !this.state.show && <div className={classes.showMore} onClick={this.openShowMore} >Show More</div>}
          {this.state.show ? children : null}
          {loadMore && this.state.show && <div className={classes.showMore} onClick={this.handleLoadMore} >Load More</div>}
          {this.state.loading && <LinearProgress />}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Comment);


