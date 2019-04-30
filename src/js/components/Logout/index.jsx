import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { authLogout } from 'Actions/auth-actions';

class Logout extends React.Component {
    constructor(props) {
        super(props);

        this.props.authLogout();
    }

    render() {
        return (
            <p>
                Logging out...
            </p>
        );
    }
}

Logout.propTypes = {
    authLogout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => {
    return ({
        auth: state.auth.response
    })
};

export default connect(mapStateToProps, { authLogout })(Logout);