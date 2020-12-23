import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import withFollowSystem from '../../hoc/withFollowSystem';

const useStyles = makeStyles((theme) => ({
  userCard: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    padding: theme.spacing(3),
    borderBottom: '1px solid ' + (theme.palette.type === 'dark' ? 'black' : '#c5c5c5')
  },
  image: {
    height: 60,
    width: 60,
    borderRadius: '50%',
  },
  userDetail: {
    flexGrow: 1,
    margin: '0 ' + theme.spacing(2) + 'px',
  }
}));

function UserCard({ divider, children, userId, profile_pic, name, username, description, followed, submitFollow, displayFollowButton }) {
  const classes = useStyles();
  return (
    <div className={classes.userCard} style={divider ? null : { borderBottom: 'none' }}>
      {children}
      <Link to={'/profile/' + userId}>
        <img className={classes.image} src={profile_pic} alt='' />
      </Link>
      <div className={classes.userDetail}>
        <Typography style={{wordBreak: 'break-word'}} color='textPrimary'>
          <Link style={{textDecoration: 'none', color: 'inherit'}} to={'/profile/' + userId}>
            <strong>{name}</strong> · @{username}
          </Link>
        </Typography>
        <Typography style={{wordBreak: 'break-word'}} color='textSecondary'>{description}</Typography>
      </div>
      { displayFollowButton && 
        <Button variant='contained' color={followed ? 'default': 'primary'} onClick={submitFollow} >
          {followed ? 'Following' : 'Follow'}
        </Button> }
    </div >
  );
}

export default withFollowSystem( UserCard );
