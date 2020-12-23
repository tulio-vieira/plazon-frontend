import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import ArrowUpwardRoundedIcon from '@material-ui/icons/ArrowUpwardRounded';
import ArrowDownwardRoundedIcon from '@material-ui/icons/ArrowDownwardRounded';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';
import withLikeSystem from '../../hoc/withLikeSystem';
import EmbededContent from '../../components/Comments/EmbededContent';

const styles = (theme) => ({
  handle: {
    color: theme.palette.primary.light,
    '& a': {
      color: 'inherit',
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline'
      }
    }
  },
  image: {
    borderRadius: '50%',
    width: 60,
    height: 60,
    marginRight: theme.spacing(2)
  },
  post: {
    padding: theme.spacing(3),
    paddingBottom: theme.spacing(1.5),
    backgroundColor: theme.palette.background.front,
    borderRadius: 16,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  divider: {
    borderBottom: theme.palette.text.secondary
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
  },
  bodyLink: {
    marginLeft: '1em',
    color: '#216fdb',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline'
    }
  },
  embededWrapper: {
    margin: theme.spacing(2,0,2,0),
    [theme.breakpoints.up('sm')]: {
      backgroundColor: theme.palette.background.mid,
      padding: theme.spacing(2),
      borderRadius: 16,
      marginTop: theme.spacing(1)
    }
  }
});

class Post extends Component {
  constructor(props) {
    super(props);
    this.body = props.body ? props.body.replace(/\n\n+/g, '\n') : null;
    if (!props.detail && this.body && this.body.length > 100) this.body = this.body.substring(0, 100) + ' ...';
  }

  render() {
    const {
      classes,
      body,
      detail,
      like_count,
      dislike_count,
      liked,
      children,
      _id,
      author_id,
      profile_pic,
      date,
      name,
      username,
      comment_count,
      title,
      linkToProfile,
      contentUrl,
      isVideo
    } = this.props;

    function LinkToProfile({children, noClass}) {
      return linkToProfile ? <Link className={!noClass ? classes.link : ''} to={'/profile/' + author_id}>
        {children}
      </Link> :
      children;
    }

    function LinkToPost({ children }) {
      return detail ? children :
      <Link style={{textDecoration: 'none', color: 'inherit'}} to={'/post/' + _id}>
        {children}
      </Link>
    }

    return (
      <div className={classes.post + ' ' + (detail ? classes.divider : '')} style={detail ? {margin: 0, borderRadius: 0} : null}>
        {children}
        <div className={classes.authorInfo}>
          <LinkToProfile><img className={classes.image} src={profile_pic} alt="" /></LinkToProfile>
          <div className={classes.info}>
            <LinkToProfile><Typography style={{ fontWeight: '400' }} variant='body1'>{name}</Typography></LinkToProfile>
          
            <Typography style={{ fontWeight: '300' }} variant='body2'>
              <span className={classes.handle}>
                <LinkToProfile noClass >{'@' + username}</LinkToProfile>
              </span>  ·  {date}  ·  <ChatBubbleOutlineIcon fontSize="small" className={classes.icon}/>  {comment_count}
            </Typography>
          </div>
        </div>

        <Typography className={classes.title} variant='h5'>         
          { detail ? title :
          <Link to={'/post/' + _id} className={classes.link} >
            {title}
          </Link>}
        </Typography>
        
        {contentUrl && <LinkToPost>
          <div className={classes.embededWrapper}>
            <EmbededContent
              isSmall={!detail}
              contentUrl={contentUrl}
              isVideo={isVideo} />
          </div>
        </LinkToPost>}

        <Typography paragraph style={{whiteSpace: 'pre-wrap'}}>
          {this.body}
          {!detail && body && body.length > 100 && <Link to={'/post/' + _id} className={classes.bodyLink} >
            Read more
          </Link>}
        </Typography>

        <Typography style={{ fontWeight: '300' }} variant='body2'>
          <IconButton onClick={() => this.props.likeHandler(true)} style={{color: (liked === 1) && 'green'}} className={classes.iconButton} edge='start'><ArrowUpwardRoundedIcon /></IconButton>{'  ' + (like_count)}
          <span className={classes.spacer} />
          <IconButton onClick={() => this.props.likeHandler(false)} style={{color: (liked === -1) && 'red'}} className={classes.iconButton}><ArrowDownwardRoundedIcon /></IconButton>{'  ' + (dislike_count)}
        </Typography>
      </div>
    );
  }
}

export default withLikeSystem( withStyles(styles)(Post), '/posts' );