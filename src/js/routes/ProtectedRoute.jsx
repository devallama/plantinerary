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
            console.log("this");
            return (
                <Page {...props} component={props.component} title={props.title} />
            );
        } else if (props.user.isLoggedIn == false) {
            console.log("that");
            return (
                <Redirect to={this.props.redirect || "/"} />
            );
        } else {
            console.log("those");
            // Could put loading thing here
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