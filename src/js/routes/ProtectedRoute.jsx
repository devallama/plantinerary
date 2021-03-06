import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { userIsLoggedIn } from 'Actions/user-actions';

import Page from '../pages/templates/page';

class ProtectedRoute extends Route {
    constructor(props) {
        super(props);

        this.props.userIsLoggedIn();
    }

    render() {
        const { props } = this;

        if (props.user.isLoggedIn == true) {
            return (
                <Page {...props} component={props.component} title={props.title} user={props.user} />
            );
        } else if (props.user.isLoggedIn == false) {
            return (
                <Redirect to={this.props.redirect || "/"} />
            );
        } else {
            return null;
        }
    }
}

ProtectedRoute.propTypes = {
    userIsLoggedIn: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
}


const mapStateToProps = state => ({
    user: state.user
});


export default connect(mapStateToProps, { userIsLoggedIn })(ProtectedRoute);