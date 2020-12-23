import React from 'react';
import { Button, IconButton, makeStyles } from '@material-ui/core';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import CoverPhoto from '../../components/CoverPhoto';
import { convertDate } from '../../shared/utility';
import { Link } from 'react-router-dom';
import withFollowSystem from '../../hoc/withFollowSystem';
import withAuthGard from '../../hoc/withAuthGard';

const useStyles = makeStyles((theme) => ({
  userInfo: {
    display: 'flex',
    alignItems: 'flex-start',
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
  },
  image: {
    position: 'relative',
    top: -20,
    height: 105,
    width: 105,
    borderRadius: '50%',
    marginRight: theme.spacing(1.5),
  },
  data: {
    '& p': {
      margin: '0.3em',
      color: theme.palette.text.secondary
    }
  },
  settings: {
    alignSelf: 'center',
    marginLeft: 'auto',
  },
  [theme.breakpoints.down('xs')]: {
    userInfo: {
      flexDirection: 'column',
      alignItems: 'center',
      marginBottom: theme.spacing(1)
    },
    settings: {
      margin: 'auto'
    },
    data: {
      textAlign: 'center'
    },
    image: {
      margin: 0,
      marginBottom: theme.spacing(1)
    }
  }
}));

function ProfileDashboard({
  userId,
  name,
  username,
  profile_pic,
  banner_pic,
  date_created,
  description,
  currentUserId,
  followed,
  submitFollow}) {
    
  const classes = useStyles();

  return (
    <>
      <CoverPhoto backgroundUrl={banner_pic} />

      <div className={classes.userInfo}>
        <img className={classes.image} src={profile_pic} alt='' />
        <div className={classes.data}>
          <p style={{ fontSize: '1.4em' }}>{name}</p>
          <p>{'@' + username}</p>
          <p style={{ marginBottom: '0.6em' }}>{'Joined ' + convertDate(date_created)}</p>
          <p style={{ marginBottom: '1em' }}>{description}</p>
        </div>
        {(currentUserId === userId) ?
          <Link className={classes.settings} to='/settings'>
            <IconButton  aria-label="delete">
                <SettingsOutlinedIcon />
            </IconButton>
          </Link>
          :
          <Button className={classes.settings}
            variant='contained' color={followed ? 'default': 'primary'} onClick={submitFollow} >
            {followed ? 'Following' : 'Follow'}
          </Button>
        }
      </div>
    </>
  );
}

export default withAuthGard( withFollowSystem( ProfileDashboard ) );