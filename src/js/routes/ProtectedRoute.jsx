import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { userIsLoggedIn } from 'Actions/user-actions';

import Page from '../pages/templates/page';

class ProtectedRoute extends Route {
    constructor(props) {
        super(props);
    }

    render() {
        const props = this.props;

        if (props.user.isLoggedIn == true) {
            return (
                <Page {...props} component={props.component} title={props.title} />
            );
        } else if (props.user.isLoggedIn == false) {
            return (
                <Redirect to="/" />
            );
        } else {
            // Could put loading thing here
            return (
                <h1>Loading...</h1>
            )
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