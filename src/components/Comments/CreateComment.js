import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { DEFAULT_PROFILE_PIC } from '../../shared/utility';
import { Button, Input } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  image: {
    height: 32,
    width: 32,
    borderRadius: '50%',
    marginRight: theme.spacing(1),
    [theme.breakpoints.down(350)]: {
      marginTop: 5,
      height: 20,
      width: 20,
      marginRight: theme.spacing(0.5)
    }
  },
  reply: {
    display: 'flex',
    marginBottom: theme.spacing(1),
  },
  replyButton: {
    textTransform: 'capitalize',
    marginTop: theme.spacing(0.6),
    marginLeft: theme.spacing(0.6),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end'
  }
}));

export default function CreateComment({ onChange, value, replyClicked, textBoxClosed, userPic, disabled, error, handleAuthFail }) {
  
  const classes = useStyles();

  return (
    <div className={classes.reply}>
      <img className={classes.image} src={userPic || DEFAULT_PROFILE_PIC} alt='' />
      <div style={{ width: '100%' }}>
        <Input
          style={{fontSize: '1em'}}
          error={error}
          disabled={disabled}
          maxLength={200}
          onChange={onChange}
          value={value}
          fullWidth 
          placeholder='Add reply...'
          multiline />
        <div className={classes.buttons}>
          {textBoxClosed &&
            <Button
              disabled={disabled}
              onClick={textBoxClosed}
              variant="contained" disableElevation
              className={classes.replyButton}
              size='small' >Cancel</Button>
          }
          <Button
            disabled={disabled}
            onClick={handleAuthFail || replyClicked}
            variant="contained" disableElevation
            color='secondary'
            className={classes.replyButton}
            size='small'>Reply</Button>
        </div>
      </div>
    </div>
  );
}