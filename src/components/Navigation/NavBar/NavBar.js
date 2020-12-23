import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchBar from './SearchBar';
import Logo from '../../Logo';
import { Link } from 'react-router-dom';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import SettingsIcon from '@material-ui/icons/Settings';

const useStyles = makeStyles((theme) => ({
    menuButton: {
        [`${theme.breakpoints.up('xs')} and (orientation: landscape)`]: {
            marginRight: theme.spacing(2)
        }
    },
    title: {
        marginRight: theme.spacing(1),
        height: 40,
        display: 'flex',
        alignItems: 'center',
        lineHeight: 0,
        textDecoration: 'none',
        color: 'inherit'
    },
    navbar: {
        boxShadow: 'none',
    },
    toolbar: {
        [theme.breakpoints.up('xs')]: {
            minHeight: 48,
        },
        [theme.breakpoints.up('sm')]: {
            minHeight: 60,
        },
    },
    profilePic: {
        height: 40,
        width: 40,
        borderRadius: '50%'
    },
    logoWrapper: {
        filter: 'invert(100%)',
        height: 30
    },
    titleText: {
        fontFamily: 'Montserrat Alternates, sans-serif',
        display: 'none',
        margin: 0,
        marginLeft: '-0.65em',
        fontSize: '1.25rem',
        fontWeight: 500,
        [theme.breakpoints.up(500)]: {
            display: 'block'
        }
    },
    navItem: {
        display: 'none',
        [theme.breakpoints.up(500)]: {
            display: 'block'
        }
    },
    searchWrapper: {
        margin: '0 auto'
    }
}));

export default function NavBar({ menuClicked, currentUser, isAuthenticated, switchedDarkMode }) {
    const classes = useStyles();

    return (
        <AppBar className={classes.navbar}>
            <Toolbar className={classes.toolbar}>
                <IconButton
                    onClick={menuClicked}
                    edge="start"
                    className={classes.menuButton}
                    color="inherit"
                    aria-label="menu">
                    <MenuIcon />
                </IconButton>
                <Link className={classes.title} to='/feed'>
                    <div className={classes.logoWrapper}>
                        <Logo />
                    </div>
                    <p className={classes.titleText}><span style={{visibility: 'hidden'}}>P</span>LAZON</p>
                </Link>

                <div className={classes.searchWrapper}>
                    <SearchBar />
                </div>
                
                {!isAuthenticated && <Button className={classes.navItem} color="inherit">
                    <Link style={{textDecoration: 'none', color: 'inherit'}} to='/login'>Login</Link></Button>}
                
                <IconButton className={classes.navItem} onClick={switchedDarkMode}>
                    <Brightness4Icon style={{color: 'white'}} /></IconButton>
                
                {isAuthenticated && <Link to={'/settings'} className={classes.navItem} style={{lineHeight: 0}}>
                    <IconButton><SettingsIcon style={{color: 'white'}} size='small' /></IconButton></Link>}
                
                {isAuthenticated && <Link to={`/profile/${currentUser._id}`} style={{ lineHeight: 0, marginLeft: 12}}
                    className={classes.navItem}>
                    <img className={classes.profilePic} src={currentUser.profile_pic} alt=''/>
                </Link>}

            </Toolbar>
        </AppBar>
    );
}
