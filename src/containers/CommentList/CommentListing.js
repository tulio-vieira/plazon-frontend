import React from 'react';
import CommentData from '../../components/Comments/CommentData';
import { Link } from 'react-router-dom';
import { makeStyles, Typography } from '@material-ui/core';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';

const useStyles = makeStyles((theme) => ({
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
    width: 32,
    height: 32,
    marginRight: theme.spacing(2)
  },
  authorInfo: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '0.9rem'
  },
  icon: {
    marginBottom: '-0.3em'
  },
  commentContainer: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(1),
    display: 'flex',
    alignItems: 'center'
  },
  spacer: {
    minWidth: 16,
    height: 50,
    display: 'flex',
    alignItems: 'center',
    textAlign: 'left',
    borderLeft: '2px dashed ' + theme.palette.text.secondary
  },
  commentListing: {
    backgroundColor: theme.palette.background.front,
    padding: 20,
    borderBottom: '1px solid ' + (theme.palette.type === 'dark' ? 'black' : '#c5c5c5')
  }
}));

export default function CommentListing ({
  post_id,
  comment_id,
  post_author_id,
  post_author_profile_pic,
  post_author_username,
  post_title,
  comment_count,
  post_date,
  username,
  body,
  date,
  like_count,
  dislike_count,
  liked,
  depth,
  profile_pic,
  children
}) {

  const classes = useStyles();

  function LinkToProfile(props) {
    return <Link className={props.className || classes.link} to={'/profile/' + post_author_id}>
      {props.children}
    </Link>;
  }

  const spacers = [];

  for(let i = 0; i < (depth > 2 ? 2 : depth); i++) {
    spacers.push(
      <div key={i} className={classes.spacer} />
    );
  }

  if (depth > 2) spacers.unshift(<div className={classes.spacer} key={5} style={{borderLeft: 'none'}} >&#8285;</div>);

  return (
    <div className={classes.commentListing}>
      {children}
      <div className={classes.authorInfo}>
        <LinkToProfile><img className={classes.image} src={post_author_profile_pic} alt="" /></LinkToProfile>
        <div className={classes.info}>          
          <Typography style={{ fontWeight: '300', marginTop: -7 }} variant='body2'>
            <LinkToProfile className={classes.handle}>
              {'@' + post_author_username}
            </LinkToProfile>  ·  {post_date}  ·  <ChatBubbleOutlineIcon fontSize="small" className={classes.icon}/>  {comment_count}
          </Typography>
        </div>
      </div>
      <Typography style={{ fontWeight: '400' }} variant='h6'>
        <Link to={`/post/${post_id}`} style={{textDecoration: 'none', color: 'inherit'}} >{post_title}</Link>
      </Typography>
      <div className={classes.commentContainer}>
        {spacers}
        <Link to={`/post/${post_id}/${comment_id}`} style={{textDecoration: 'none', color: 'inherit'}} >
          <CommentData
            username={username}
            disabled={true}
            body={body}
            date={date}
            like_count={like_count}
            dislike_count={dislike_count}
            liked={liked}
            profile_pic={profile_pic}/>
        </Link>
      </div>
    </div>
  );
}
