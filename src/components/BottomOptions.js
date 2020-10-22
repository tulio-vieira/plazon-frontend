import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  bottomOptions: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: theme.spacing(1),
  },
  message: {
    display: 'inline-block',
    marginRight: theme.spacing(1),
  },
  replyButton: {
    marginLeft: theme.spacing(1),
  },
  [theme.breakpoints.down('xs')]: {
    message: {
      fontSize: '0.8em'
    },
    replyButton: {
      marginBottom: theme.spacing(1),
      float: 'right'
    },
  },
}));

export default function BottomOptions(props) {
  const classes = useStyles();

  return (
    <div className={classes.bottomOptions}>
      <Typography className={classes.message + ' ' + props.messageClass} variant='body1' >{props.message}</Typography>
      <div>
        {props.handleCanceled ?
          <Button
            disabled={props.mainButtonDisabled}
            onClick={props.handleCanceled}
            variant="contained" disableElevation
            className={classes.replyButton} >Cancel</Button>
          : null}
        <Button
          disabled={props.mainButtonDisabled}
          variant="contained"
          onClick={props.mainButtonClicked}
          disableElevation color={props.mainButtonColor}
          className={classes.replyButton}>{props.mainButtonText}</Button>
      </div>
    </div>
  );
}