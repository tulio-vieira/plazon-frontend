import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Heading from './Heading';

const useStyles = makeStyles((theme) => ({
  list: {
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: theme.spacing(2)
  }
}));

export default function List({ title, children, out }) {
  const classes = useStyles();

  return (
    <>
      <div className={classes.list}>
        <Heading variant='h6'>{title}</Heading>
        {!out && children}
      </div>
      {out && children}
    </>
  );
}