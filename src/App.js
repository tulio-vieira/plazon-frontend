import React, { Component, lazy, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { createMuiTheme, CssBaseline, LinearProgress, ThemeProvider } from '@material-ui/core';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import Layout from './hoc/Layout';
import Feed from './containers/Feed';
import PostDetail from './containers/PostDetail';
import Profile from './containers/Profile/Profile';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout';
import { connect } from 'react-redux';
import * as actions from './store/actions/index'
import Search from './containers/Search';
import Discover from './containers/Discover';
const AccountSettings = lazy(() => import('./containers/AccountSettings'));

class App extends Component {
  constructor(props){
    super(props)
    this.state = { dark: true };
    this.props.onTryAutoSignup();
  }

  switchDarkMode = () => {
    this.setState(prevState => ({
      dark: !prevState.dark
    }));
  }

  render() {
    const lightTheme = createMuiTheme({
      palette: {
        type: 'light',
        primary: {
          main: purple[500],
        },
        secondary: {
          main: green[500],
        },
        background: {
          default: '#dfdfdf',
          back: '#dfdfdf',
          mid: '#efefef',
          front: '#f7f7f7'
        },
        text: {
          secondary: '#2e2e2e'
        }
      },
    });

    const darkTheme = createMuiTheme({
      palette: {
        type: 'dark',
        primary: {
          main: purple[500],
        },
        secondary: {
          main: green[500],
        },
        background: {
          default: '#424242',
          back: '#424242',
          mid: '#2d2d2d',
          front: '#232323'
        },
        text: {
          secondary: '#cccccc'
        }
      },
    });

    return (
      <ThemeProvider theme={this.state.dark ? darkTheme : lightTheme}>
        <CssBaseline />
        <Layout switchedDarkMode={this.switchDarkMode}>
          <Suspense fallback={<LinearProgress style={{marginTop: 24}}/>}>
            <Switch>
              <Route path='/post/:postId/:commentId?' component={PostDetail} />
              {this.props.isAuthenticated && <Route path='/settings' component={AccountSettings} />}
              <Route path='/login' render={(props) => <Auth register={false} {...props} />} />
              <Route path='/register' render={(props) => <Auth register={true} {...props} />} />
              {this.props.isAuthenticated && <Route path='/logout' component={Logout} />}
              <Route path='/search' component={Search} />
              <Route path='/discover' component={Discover} />
              <Route path='/feed' component={Feed} />
              <Route path='/profile/:id' component={Profile} />
              <Redirect to='/feed' />
            </Switch>
          </Suspense>
        </Layout>
      </ThemeProvider>
    );
  }
}


const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch( actions.authCheckState() )
  };
};

export default connect( mapStateToProps, mapDispatchToProps )( App );