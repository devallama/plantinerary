import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { authRegister } from 'Actions/auth-actions';
import Form from '../Form';
import FormInput from '../FormInput';

class RegisterForm extends React.Component {
    constructor(props) {
        super(props);

        this.fields = {
            name: {
                errorMessages: {
                    required: "Your name is required"
                },
                keep: true
            },
            email: {
                errorMessages: {
                    required: "Your email address is required",
                    format: "The email address given must be valid"
                },
                keep: true
            },
            password: {
                errorMessages: {
                    required: "A password is required",
                    lengthShort: "Your password must be more than 8 characters"
                }
            },
            confirmPassword: {
                errorMessages: {
                    required: "Please confirm your password",
                    match: "The password given does not match the one above"
                },
                customValidation: {
                    match: (field, fields) => field.value == fields.password.value
                }
            },
        }
    };

    render() {
        return (
            <div>
                {this.props.auth.message &&
                    <div className="alert alert-danger">
                        {this.props.auth.message}
                    </div>
                }
                <Form fields={this.fields} className="form form--login col-md-4 offset-md-4" noValidate multiSubmit={true}
                    submitMethod={this.props.authRegister}>
                    <h2>Register</h2>
                    <FormInput label="Name" name="name" required />
                    <FormInput label="Email Address" name="email" type="email" required />
                    <FormInput label="Password" name="password" type="password" required minLength="8" />
                    <FormInput label="Confirm Password" name="confirmPassword" type="password" required />
                    <button className="btn btn-primary">Register</button>
                </Form>
            </div>
        );
    }
}

RegisterForm.propTypes = {
    authRegister: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => {
    return ({
        auth: state.auth.response
    });
}

export default connect(mapStateToProps, { authRegister })(RegisterForm);