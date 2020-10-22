import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchBar from './SearchBar';
import Logo from '../../Logo';


const useStyles = makeStyles((theme) => ({
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        marginRight: 'auto',
        paddingRight: theme.spacing(1),
        height: 40,
        display: 'flex',
        alignItems: 'center'
    },
    navbar: {
        boxShadow: 'none',
    },
    toolbar: {
        [`${theme.breakpoints.up('xs')} and (orientation: landscape)`]: {
            minHeight: 48,
        },
        [theme.breakpoints.up('sm')]: {
            minHeight: 60,
        },
    }
}));

export default function NavBar(props) {
    const classes = useStyles();

    return (
        <AppBar className={classes.navbar}>
            <Toolbar className={classes.toolbar}>
                <IconButton
                    onClick={props.menuClicked}
                    edge="start"
                    className={classes.menuButton}
                    color="inherit"
                    aria-label="menu">
                    <MenuIcon />
                </IconButton>
                <div className={classes.title}>
                    <Logo />
                    <Typography variant='h6' style={{ marginLeft: 10 }}>Plazon</Typography>
                </div>
                <SearchBar />
                <Button color="inherit">Login</Button>
                <Button onClick={props.switchedDarkMode} color="inherit">DarkMode</Button>
            </Toolbar>
        </AppBar>
    );
}
