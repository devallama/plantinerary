import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { authLogin } from 'Actions/auth-actions';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        };
    }

    onSubmit = event => {
        event.preventDefault();

        this.props.authLogin({
            email: this.state.email,
            password: this.state.password
        });
    }

    onChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {
        return (
            <form onSubmit={this.onSubmit} className="form form--login col-md-4 offset-md-4">
                <h2>Login</h2>
                <div className="form-group">
                    <label htmlFor="input_email">Email Address</label>
                    <input id="input_email" className="form-control" name="email" type="email" value={this.state.email} onChange={this.onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="input_password">Password</label>
                    <input id="input_password" className="form-control" name="password" type="password" value={this.state.password} onChange={this.onChange} />
                </div>
                <button type="login" className="btn btn-primary">Submit</button>
            </form>
        );
    }
}

LoginForm.propTypes = {
    authLogin: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => {
    console.log("here");
    console.log(state);
    return ({
        auth: state.auth.response
    });
}

export default connect(mapStateToProps, { authLogin })(LoginForm);