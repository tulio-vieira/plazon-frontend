import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  heading: {
    backgroundColor: theme.palette.background.mid,
    padding: theme.spacing(2) + 'px ' + theme.spacing(3) + 'px',
  },
}));

export default function Heading(props) {
  const classes = useStyles();

  return (
    <div className={classes.heading}>
      <Typography style={{ margin: 0, fontWeight: 'lighter' }} variant={props.variant}>{props.children}</Typography>
    </div>
  );
}
