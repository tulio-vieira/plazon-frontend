import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Heading from './UI/Heading';

const useStyles = makeStyles((theme) => ({
  errorPage: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: theme.spacing(3),
    marginTop: theme.spacing(3)
  }
}));

export default function ErrorPage() {
  const classes = useStyles();
  return (
    <div className={classes.errorPage}>
      <Heading variant='h5'>404 Not found</Heading>
    </div>
  );
}