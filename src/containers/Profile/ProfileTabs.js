import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  profileTabs: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
    '& a': {
      flexGrow: 1,
      textDecoration: 'none',
      position: 'relative'
    },
    '& button': {
      width: '100%',
      borderRadius: 0
    },
    '& span': {
      color: theme.palette.type === 'dark' ? '#cccccc' : '#5d5d5d',
    }
  },
  underline: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: theme.palette.primary.main,
    height: 2,
    width: '100%',
    transform: 'scaleX(0)',
    transition: 'all 150ms linear',
  },
  active: {
    '& div': {
      transform: 'scaleX(1)'
    },
    '& span': {
      color: theme.palette.type === 'dark' ? 'white' : 'black',
    }
  }
}));

export default function ProfileTabs() {
  const classes = useStyles();
  const navlinks = [
    { title: 'Posts', link: 'posts' },
    { title: 'Comments', link: 'comments' },
    { title: '10 Followers', link: 'followers' },
    { title: '8 Following', link: 'following' },
  ];

  return (
    <div className={classes.profileTabs}>
      {navlinks.map(navlink => (
        <NavLink
          key={navlink.title}
          activeClassName={classes.active}
          to={navlink.link}
          exact><Button>{navlink.title}</Button><div className={classes.underline} /></NavLink>
      ))}
    </div>
  );
}