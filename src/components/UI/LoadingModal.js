import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  backDrop: {
    position: 'absolute',
    backgroundColor: 'rgba(68, 68, 68, 0.5)',
    zIndex: 100,
    top: 0,
    borderRadius: 16,
    left: 0,
    width: '100%',
    height: '100%',
    transition: 'opacity 0.5s',
    opacity: 1
  },
  hide: {
    opacity: 0,
    pointerEvents: 'none'
  },
  loadingCircle: {
    position: 'fixed',
    left: 'calc(50% - 20px)',
    top: 'calc(50% - 20px)',
  }
}));

export default function LoadingModal({ show }) {
  const classes = useStyles();

  return (
    <div className={classes.backDrop + (show ? '' : classes.hide)}>
      {show && <CircularProgress className={classes.loadingCircle} />}
    </div>
  );
}