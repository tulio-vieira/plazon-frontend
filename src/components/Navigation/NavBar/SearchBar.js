import React, { Component } from 'react';
import { darken, withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { withRouter } from 'react-router';

const styles = (theme) => {
    const fontColor = theme.palette.type === 'dark' ? 'white' : 'black';
    return {
        search: {
            paddingLeft: theme.spacing(1),
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            borderRadius: 17,
            backgroundColor: theme.palette.background.front,
            '&:hover': {
                backgroundColor: darken(theme.palette.background.front, 0.1)
            },
            marginRight: 0,
            maxWidth: 440
        },
        searchIcon: {
            color: fontColor,
            cursor: 'pointer',
            marginRight: theme.spacing(1),
            height: '100%',
        },
        input: {
            backgroundColor: 'inherit',
            border: 'none',
            outline: 'none',
            color: fontColor,
            padding: theme.spacing(1, 0, 1, 1),
            fontSize: '0.8rem',
            width: '100%',
            [theme.breakpoints.up(800)]: {
                transition: theme.transitions.create('width'),
                width: 164,
                '&:focus': {
                    width: 400
                }
            }
        }
    }
};

class SearchBar extends Component {
    state = {value: ''}

    handleInput = (e) => {
        this.setState({value: e.target.value});
    }

    handleKeyPress = (e) => {
        if (e.charCode === 13) this.submitInput();
    }

    submitInput = () => {
        if (this.state.value.length === 0) return;
        if (this.props.location.pathname.match(/\/search\/(users|posts)/g)) {
            this.props.history.push(this.props.location.pathname + '?search=' + this.state.value);
        } else {
            this.props.history.push('/search/users?search=' + this.state.value);
        }
    }
    
    render() {
        const classes = this.props.classes;
        return (
            <div className={classes.search}>
                <input
                    placeholder="Search Plazon…"
                    value={this.state.value}
                    onChange={this.handleInput}
                    onKeyPress={this.handleKeyPress}
                    className={classes.input} />

                <SearchIcon onClick={this.submitInput}  className={classes.searchIcon} />
            </div>
        );
    }
}

export default withStyles(styles)(withRouter(SearchBar))