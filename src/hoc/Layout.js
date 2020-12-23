import React, { Component, Fragment } from 'react';
import NavBar from '../components/Navigation/NavBar/NavBar';
import SideDrawer from '../components/Navigation/SideDrawer/SideDrawer';
import { withStyles } from '@material-ui/styles';
import { connect } from 'react-redux';

const styles = (theme) => ({
    wrapper: {
        color: theme.palette.type === 'dark' ? 'white' : 'black',
        margin: '0 20%',
        paddingTop: 60,
        [theme.breakpoints.down(960)]: {
            margin: '0 10%',
        },
        [theme.breakpoints.down(600)]: {
            margin: '0 5%',
            paddingTop: 56
        },
        [theme.breakpoints.down(350)]: {
            margin: 0,
        },
    }
});

class Layout extends Component {
    state = { showSideDrawer: false };

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer };
        });
    }

    sideDrawerClosedHandler = () => {
        this.setState({ showSideDrawer: false });
    }

    render() {
        return (
            <Fragment>
                <NavBar
                    switchedDarkMode={this.props.switchedDarkMode}
                    menuClicked={this.sideDrawerToggleHandler}
                    isAuthenticated={this.props.isAuthenticated}
                    currentUser={this.props.currentUser} />
                <SideDrawer
                    switchedDarkMode={this.props.switchedDarkMode}
                    isAuthenticated={this.props.isAuthenticated}
                    currentUser={this.props.currentUser}
                    open={this.state.showSideDrawer}
                    onClose={this.sideDrawerClosedHandler} />
                <main className={this.props.classes.wrapper}>
                    {this.props.children}
                </main>
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
        currentUser: state.auth.currentUser,
    };
};

export default connect(mapStateToProps)(withStyles(styles)(Layout));