import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    backgroundColor: theme.palette.background.mid,
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  }
}));

export default function DashBoardWrapper({ children }) {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      {children}
    </div>
  );
}