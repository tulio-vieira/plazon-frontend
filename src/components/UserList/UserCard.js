import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

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

export default function UserCard(props) {
  const classes = useStyles();
  return (
    <div className={classes.userCard} style={props.divider ? null : { borderBottom: 'none' }}>
      {props.children}
      <Link to={'/profile/' + props.userId}>
        <img className={classes.image} src={props.profile_pic} alt='' />
      </Link>
      <div className={classes.userDetail}>
        <Link style={{textDecoration: 'none'}} to={'/profile/' + props.userId}>
          <Typography style={{wordBreak: 'break-word'}} color='textPrimary'><strong>{props.name}</strong> · @{props.username}</Typography>
        </Link>
        <Typography style={{wordBreak: 'break-word'}} color='textSecondary'>{props.description}</Typography>
      </div>
      <Button variant='contained' color='primary'>Follow</Button>
    </div >
  );
}
