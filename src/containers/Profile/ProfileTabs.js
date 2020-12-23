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

export default function ProfileTabs({ navLinks }) {
  const classes = useStyles();
  return (
    <div className={classes.profileTabs}>
      {navLinks.map(navLink =>
        <NavLink
          key={navLink.title}
          activeClassName={classes.active}
          to={navLink.to}
          exact><Button>{navLink.title}</Button><div className={classes.underline} /></NavLink>
      )}
    </div>
  );
}