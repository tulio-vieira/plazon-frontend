import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import ArrowUpwardRoundedIcon from '@material-ui/icons/ArrowUpwardRounded';
import ArrowDownwardRoundedIcon from '@material-ui/icons/ArrowDownwardRounded';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  commentData: {
    display: 'flex',
    alignItems: 'flex-start',
    marginBottom: theme.spacing(1.5)
  },
  image: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
    height: 32,
    width: 32,
    borderRadius: '50%',
    [theme.breakpoints.down(350)]: {
      height: 20,
      width: 20
    },
  },
  commentInfo: {
    '& p': {
      wordBreak: 'break-word'
    }
  },
  username: {
    margin: '0 0 0.1em 0',
    fontSize: '0.9em',
    color: theme.palette.text.secondary
  },
  rating: {
    color: theme.palette.text.secondary,
    margin: 0,
    fontSize: '0.8em',
    marginLeft: -theme.spacing(1),
    marginTop: -theme.spacing(0.2),
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
    '&:hover': {
      textDecoration: 'underline'
    }
  }
}));

export default function CommentData({
  username,
  body,
  date,
  like_count,
  dislike_count,
  liked,
  likeHandler,
  onReplyClicked,
  author_id,
  profile_pic,
  disabled }) {
  const classes = useStyles();

  function OptionalLink({style, children, className}) {
    return author_id ? <Link to={'/profile/' + author_id} style={style} className={className}>
      {children}
    </Link> : children;
  }

  return (
    <div className={classes.commentData} style={disabled && {marginBottom: 0}}>
      <OptionalLink style={{display: 'block', textDecoration: 'none'}}>
        <img
          className={classes.image}
          src={profile_pic} alt='' />
      </OptionalLink>
      <div className={classes.commentInfo}>
        <p className={classes.username}>
          <OptionalLink className={classes.link}>{'@' + username}</OptionalLink>{'  ·  ' + date}
        </p>
        <p style={{margin: 0}} >{body}</p>
        <div className={classes.rating}>
          <IconButton disabled={disabled} size='small' color='inherit' onClick={() => likeHandler(true)} style={{color: (liked === 1) && 'green'}}><ArrowUpwardRoundedIcon fontSize='small' /></IconButton>{like_count}
          <IconButton disabled={disabled} size='small' color='inherit' onClick={() => likeHandler(false)} style={{color: (liked === -1) && 'red'}}><ArrowDownwardRoundedIcon fontSize='small' /></IconButton>{dislike_count}
          {onReplyClicked && 
            <Button
              color="secondary"
              size='small'
              style={{ textTransform: 'capitalize' }}
              onClick={onReplyClicked}>Reply</Button>
          }
        </div>
      </div>
    </div>
  );
}