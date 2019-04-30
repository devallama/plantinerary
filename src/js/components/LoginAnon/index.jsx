import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { authLoginAnon } from 'Actions/auth-actions';

class LoginAnon extends React.Component {
    constructor(props) {
        super(props);

        this.props.authLoginAnon();
    }

    render() {
        return (
            <p>
                Logging in anonymously...
            </p>
        );
    }
}

LoginAnon.propTypes = {
    authLoginAnon: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => {
    return ({
        auth: state.auth.response
    });
}

export default connect(mapStateToProps, { authLoginAnon })(LoginAnon);