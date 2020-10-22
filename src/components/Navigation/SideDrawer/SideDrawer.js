import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import UserInfo from './UserInfo';
import { Link } from 'react-router-dom';
import CoverPhoto from '../../CoverPhoto';
import { DEFAULT_BANNER } from '../../../shared/utility';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
        backgroundColor: theme.palette.type === 'dark' ? theme.palette.background.front : theme.palette.primary.light
    },
    drawerContainer: {
        overflow: 'auto',
    },
    closeIcon: {
        color: 'white',
        position: 'absolute',
        fontSize: 20,
        margin: 0,
        top: 5,
        right: 7,
        cursor: 'pointer'
    },
    link: {
        textDecoration: 'none',
        textTransform: 'capitalize',
        color: 'inherit',
        padding: theme.spacing(2) + 'px ' + theme.spacing(2.5) + 'px',
        width: '100%',
        height: '100%'
    },
    listItem: {
        padding: 0
    }
}));

function SideDrawer(props) {
    const classes = useStyles();
    // change this
    let links = {
        'Feed': { to: '/feed' },
        // for development
        'User List': { to: '/userlist' },
        'Some profile': { to: '/profile/5f8b589ca09ee50f3c67ce96' },
    };

    if (props.isAuthenticated) {
        links = {
            ...links,
            'My Profile': { to: `/profile/${props.currentUser._id}` },
            'Settings': { to: '/settings' },
            'Logout': { to: '/logout' }
        };
    } else {
        links = {
            ...links,
            'Login': { to: '/login' },
            'Register': { to: '/register' }            
        };
    }

    return (
        <Drawer
            anchor='left'
            open={props.open}
            onClose={props.onClose}
            className={classes.drawer}
            classes={{
                paper: classes.drawerPaper,
            }} >
                
            <CoverPhoto backgroundUrl={(props.currentUser && props.currentUser.banner_pic) || DEFAULT_BANNER} />
            <div onClick={props.onClose} className={classes.closeIcon}>{<>&#10006;</>}</div>
            {props.isAuthenticated && <UserInfo currentUser={props.currentUser} />}

            <div className={classes.drawerContainer}>

                <List style={{padding: 0}} onClick={props.onClose}>
                    {Object.keys(links).map(key => (
                        <ListItem key={key} button className={classes.listItem}>
                            <Link className={classes.link} {...links[key]} >{key}</Link>
                        </ListItem>
                    ))}
                </List>

            </div>
        </Drawer>
    );
}

export default SideDrawer;