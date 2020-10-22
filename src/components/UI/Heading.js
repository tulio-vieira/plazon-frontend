import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  heading: {
    marginTop: theme.spacing(3),
    backgroundColor: theme.palette.background.mid,
    padding: theme.spacing(2) + 'px ' + theme.spacing(3) + 'px',
    borderRadius: '10px 10px 0 0',
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
