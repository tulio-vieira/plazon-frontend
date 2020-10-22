import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    userInfo: {
        color: theme.palette.type === 'dark' ? 'white' : 'black',
        fontSize: '1em',
        fontWeight: 500,
        position: 'relative',
        bottom: '20px',
        marginLeft: theme.spacing(2.5),
        '& p': {
            wordBreak: 'break-word'
        }
    },
    image: {
        height: 60,
        width: 60,
        borderRadius: '50%',
    },
    username: {
        margin: '0.5em 0',
    },
    nickname: {
        fontSize: '0.8em',
        margin: 0
    }
}));

export default function UserInfo(props) {
    const classes = useStyles();
    return (
        <div className={classes.userInfo}>
            <img className={classes.image} src={props.currentUser.profile_pic} alt='' />
            <p className={classes.username} >{props.currentUser.name}</p>
            <p className={classes.nickname}>{'@' + props.currentUser.username}</p>
        </div>
    );
}