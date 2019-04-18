import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { authLogin } from 'Actions/auth-actions';

import Form from 'Components/Form';
import FormInput from 'Components/FormInput';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);

        this.fields = {
            email: {
                errorMessages: {
                    required: "Your email address is required",
                    format: "The email address given must be valid"
                }
            },
            password: {
                errorMessages: {
                    required: "A password is required",
                    lengthShort: "Your password must be more than 8 characters"
                }
            }
        }
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
            <Form fields={this.fields} className="form form--login col-md-4 offset-md-4" noValidate
                submitMethod={this.props.authLogin}>
                <h2>Login</h2>
                <FormInput label="Email Address" name="email" type="email" required />
                <FormInput label="Password" name="password" type="password" required minLength="8" />
                <button type="login" className="btn btn-primary">Submit</button>
            </Form>
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