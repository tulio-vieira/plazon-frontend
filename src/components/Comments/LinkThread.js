import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ArrowForwardIosRoundedIcon from '@material-ui/icons/ArrowForwardIosRounded';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  showMore: {
    marginBottom: theme.spacing(1),
    color: theme.palette.primary.light,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline'
    },
    cursor: 'pointer',
    fontSize: '0.9em',
  },
}));

export default function LinkThread({ forward, children, to, onClick }) {
  const classes = useStyles();

  return (
    <div style={{marginBottom: 8}}>
      {onClick ? <span className={classes.showMore} onClick={onClick} >{children}</span> :
      <Link to={to} className={classes.showMore} style={{display: 'flex', alignItems: 'center'}}>
        {!forward && <ArrowBackIosRoundedIcon fontSize='small'/>}
        <span>{children}</span>
        {forward && <ArrowForwardIosRoundedIcon fontSize='small'/>}
      </Link>}
    </div>
  );
}