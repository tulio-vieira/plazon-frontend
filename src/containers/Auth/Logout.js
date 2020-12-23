import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';
import { LinearProgress } from '@material-ui/core';

class Logout extends Component {
    componentDidMount () {
        this.props.logout();
    }

    componentDidUpdate() {
        this.props.history.goBack();
    }

    render () {
        return <LinearProgress style={{marginTop: 24}}/>;
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(actions.logout())
    };
};

export default connect(null, mapDispatchToProps)(Logout);