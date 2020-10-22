import React from 'react';
import InputBase from '@material-ui/core/InputBase';
import { makeStyles, darken } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => {
    const fontColor = theme.palette.type === 'dark' ? 'white' : 'black';
    return {
        search: {
            position: 'relative',
            paddingLeft: theme.spacing(1),
            borderRadius: 17,
            backgroundColor: theme.palette.background.front,
            '&:hover': {
                backgroundColor: darken(theme.palette.background.front, 0.1)
            },
            marginRight: 0,
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                marginRight: theme.spacing(1),
                width: 'auto',
            },
        },
        searchIcon: {
            padding: theme.spacing(0, 1),
            color: fontColor,
            height: '100%',
            position: 'absolute',
            top: 0,
            right: 0,
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        inputRoot: {
            color: fontColor,
        },
        inputInput: {
            padding: theme.spacing(1, 0, 1, 1),
            // vertical padding + font size from searchIcon
            paddingRight: `calc(1em + ${theme.spacing(4)}px)`,
            transition: theme.transitions.create('width'),
            fontSize: '0.8rem',
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                width: '12ch',
                '&:focus': {
                    width: '20ch',
                },
            },
        },
    }
});

export default function SearchAppBar() {
    const classes = useStyles();

    return (
        <div className={classes.search}>
            <InputBase
                placeholder="Search Plazon…"
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
            />
            <div className={classes.searchIcon}>
                <SearchIcon />
            </div>
        </div>
    );
}
