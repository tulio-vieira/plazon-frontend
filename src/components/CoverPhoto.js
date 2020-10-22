import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  coverPhoto: {
    width: '100%',
    paddingBottom: '33.33333%',
    backgroundSize: 'cover',
    position: 'relative',
  },
  content: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
}));

export default function CoverPhoto(props) {
  const classes = useStyles();
  return (
    <div className={classes.coverPhoto} style={{ backgroundImage: 'url("' + props.backgroundUrl + '")' }}>
      {props.children ?
        <div className={classes.content}>
          {props.children}
        </div>
        : null}
    </div>
  );
}