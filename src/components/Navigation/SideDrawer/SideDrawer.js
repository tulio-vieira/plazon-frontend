import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import UserInfo from './UserInfo';
import { Link } from 'react-router-dom';
import CoverPhoto from '../../CoverPhoto';
import { DEFAULT_BANNER } from '../../../shared/utility';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import { IconButton } from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
        backgroundColor: theme.palette.background.front
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
    },
    footer: {
        marginTop: 'auto',
        marginLeft: theme.spacing(2),
        marginBottom: theme.spacing(2),
        color: theme.palette.text.secondary,
        fontSize: '0.8rem',
        '& a': {
            display: 'flex',
            alignItems: 'center',
            color: 'inherit'
        },
        '& span': {
            marginLeft: '0.1em'
        }
    },
}));

function SideDrawer({ isAuthenticated, currentUser, open, onClose, switchedDarkMode }) {
    const classes = useStyles();

    let links = {
        'Feed': { to: '/feed' },
        'Discover Users': { to: '/discover' }
    };

    if (isAuthenticated) {
        links = {
            ...links,
            'My Profile': { to: `/profile/${currentUser._id}` },
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
            open={open}
            onClose={onClose}
            className={classes.drawer}
            classes={{
                paper: classes.drawerPaper,
            }} >
                
            <CoverPhoto backgroundUrl={(currentUser.banner_pic) || DEFAULT_BANNER} />
            <div onClick={onClose} className={classes.closeIcon}>&#10006;</div>
            {isAuthenticated && <UserInfo currentUser={currentUser} />}

            <div className={classes.drawerContainer}>

                <List style={{padding: 0}} onClick={onClose}>
                    {Object.keys(links).map(key => (
                        <ListItem key={key} button className={classes.listItem}>
                            <Link className={classes.link} {...links[key]} >{key}</Link>
                        </ListItem>
                    ))}
                </List>

            </div>
            
            <div className={classes.footer}>
                <IconButton onClick={switchedDarkMode}>
                    <Brightness4Icon />
                </IconButton>
                <p>2020 Plazon</p>
                <p>Created by: <strong>Tulio Vieira</strong></p>
                <a href="https://github.com/tulio-vieira/plazon-backend"><GitHubIcon style={{height: '0.8em'}}/><span>/tulio-vieira</span></a>
            </div>
        </Drawer>
    );
}

export default SideDrawer;