import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import ArrowUpwardRoundedIcon from '@material-ui/icons/ArrowUpwardRounded';
import ArrowDownwardRoundedIcon from '@material-ui/icons/ArrowDownwardRounded';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';

const styles = (theme) => ({
  handle: {
    color: theme.palette.primary.light,
    textDecoration: 'none',
    '&:hover': {
      cursor: 'pointer',
      textDecoration: 'underline',
    }
  },
  image: {
    borderRadius: '50%',
    width: 60,
    height: 60,
    marginRight: theme.spacing(2)
  },
  post: {
    backgroundColor: theme.palette.background.mid,
    padding: theme.spacing(3),
    paddingBottom: theme.spacing(1.5),
    borderRadius: 16,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  authorInfo: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '0.9rem',
    marginBottom: theme.spacing(1.5)
  },
  icon: {
    marginBottom: '-0.3em'
  },
  iconButton: {
    padding: 8,
  },
  title: {
    marginBottom: theme.spacing(1)
  },
  spacer: {
    padding: theme.spacing(1.5)
  },
  link: {
    color: 'inherit',
    textDecoration: 'none'
  }
});

class Post extends Component {
  constructor(props){
    super(props);
    this.state = {
      liked: props.liked,
      like_count: props.like_count,
      dislike_count: props.dislike_count
    };
  }

  likeHandler = (isLike) => {
    if (!this.props.isAuthenticated) return this.props.onAuthFail('You need to be logged in to rate a post');
    this.props.rated(isLike);
    let newState = {...this.state, liked: isLike ? 1 : -1};
    if (newState.liked === this.state.liked) {
      newState.liked === 1 ? newState.like_count-- : newState.dislike_count--;
      newState.liked = 0;
    } else if (this.state.liked === 0) {
      newState.liked === 1 ? newState.like_count++ : newState.dislike_count++;
    } else {
      newState.like_count += newState.liked;
      newState.dislike_count -= newState.liked;
    }
    this.setState(newState);
  }

  render() {
    const {
      classes,
      children,
      post_id,
      author_id,
      profile_pic,
      date,
      name,
      username,
      comment_count,
      title,
      body,
    } = this.props;

    function LinkToProfile(props) {
      return <Link className={props.className || classes.link} to={'/profile/' + author_id}>
        {props.children}
      </Link>;
    }

    return (
      <div className={classes.post}>
        {children}
        <div className={classes.authorInfo}>
          <LinkToProfile><img className={classes.image} src={profile_pic} alt="" /></LinkToProfile>
          <div className={classes.info}>
            <LinkToProfile><Typography style={{ fontWeight: '400' }} variant='body1'>{name}</Typography></LinkToProfile>
          
            <Typography style={{ fontWeight: '300' }} variant='body2'>
              <LinkToProfile className={classes.handle}>
                {'@' + username}
              </LinkToProfile>  ·  {date}  ·  <ChatBubbleOutlineIcon fontSize="small" className={classes.icon}/>  {comment_count}
            </Typography>
          </div>
        </div>
          <Typography className={classes.title} variant='h5'>         
            { post_id ?
            <Link to={'/post/' + post_id} className={classes.link} >
              {title}
            </Link> : title }
          </Typography>
        <Typography paragraph>{body}</Typography>
        <Typography style={{ fontWeight: '300' }} variant='body2'>
          <IconButton onClick={this.likeHandler.bind(this, true)} style={{color: (this.state.liked === 1) && 'green'}} className={classes.iconButton} edge='start'><ArrowUpwardRoundedIcon /></IconButton>{'  ' + (this.state.like_count)}
          <span className={classes.spacer} />
          <IconButton onClick={this.likeHandler.bind(this, false)} style={{color: (this.state.liked === -1) && 'red'}} className={classes.iconButton}><ArrowDownwardRoundedIcon /></IconButton>{'  ' + (this.state.dislike_count)}
        </Typography>
      </div>
    );
  }
}

export default withStyles(styles)(Post);