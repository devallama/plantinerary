import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { authRegister } from 'Actions/auth-actions';

class RegisterForm extends React.Component {
    constructor(props) {
        super(props);

        const defaultFieldState = {
            value: "",
            touched: false,
            valid: true,
            typeMismatch: false,
            errorMessage: ""
        };

        this.state = {
            hasSubmitted: false,
            fields: {
                name: {
                    ...defaultFieldState,
                    errorMessages: {
                        required: "Your name is required"
                    }
                },
                email: {
                    ...defaultFieldState,
                    errorMessages: {
                        required: "Your email address is required",
                        format: "The email address given must be valid"
                    }
                },
                password: {
                    ...defaultFieldState,
                    errorMessages: {
                        required: "A password is required",
                        lengthShort: "Your password must be more than 8 characters"
                    }
                },
                confirmPassword: {
                    ...defaultFieldState,
                    errorMessages: {
                        required: "Please confirm your password",
                        match: "The password given does not match the one above"
                    },
                    customValidation: {
                        match: (field) => field.value == this.state.fields.password.value
                    }
                },
            }
        };
    }

    onChange = event => {
        const input = event.target;
        let field = { ...this.state.fields[input.name] };

        field.value = input.value;

        this.setState({
            fields: { ...this.state.fields, [input.name]: field }
        });
    }

    onFocus = event => {
        const input = event.target;
        let field = { ...this.state.fields[input.name] };

        if (!field.touched) {
            field.touched = true;

            this.setState({
                fields: { ...this.state.fields, [input.name]: field }
            });
        }
    }

    validateField(field, input) {
        const { validity } = input;

        field.valid = true;
        field.touched = true;

        if (field.customValidation) {
            let validations = field.customValidation;

            Object.keys(validations).forEach(key => {
                if (!validations[key](field)) {
                    field.valid = false;
                    field.errorMessage = field.errorMessages[key];
                }
            });
        }

        if (!validity.valid && field.valid) {
            const validationErrors = {};

            for (const key in validity) {
                const value = validity[key];

                if (value) {
                    validationErrors[key] = value;
                }
            }

            field.valid = false;

            switch (Object.keys(validationErrors)[0]) {
                case "valueMissing":
                    field.errorMessage = field.errorMessages.required;
                    break;
                case "typeMismatch":
                    field.errorMessage = field.errorMessages.format;
                    break;
                case "tooShort":
                    field.errorMessage = field.errorMessages.lengthShort;
                    break;
                default:
                    field.errorMessage = "This field is not valid.";
            }
        }

        return field;
    }

    onBlur = event => {
        const input = event.target;

        let field = this.validateField({ ...this.state.fields[input.name] }, input);

        this.setState({
            fields: { ...this.state.fields, [input.name]: field }
        });
    }

    validateFieldsOnSubmit(fields, event) {
        Object.keys(fields).forEach(key => {
            let input = event.target.querySelector(`[name=${key}]`);
            fields[key] = this.validateField(fields[key], input);
        });

        this.setState({
            ...fields
        }, this.onSubmit(event));
    }

    onSubmit = event => {
        event.preventDefault();

        let fields = this.state.fields;
        var hasUntouchedFields = false;

        Object.keys(fields).forEach(key => {
            if (!fields[key].touched) {
                hasUntouchedFields = true;
            }
        });

        if (hasUntouchedFields) {
            this.validateFieldsOnSubmit(fields, event);
            return;
        } else {
            if (!Object.keys(fields).some(key => !fields[key].valid)) {
                if (this.state.hasSubmitted) {
                    alert("Sorry, there is an issue with this page. Please refresh and try again.");
                } else {
                    // Submit
                    this.setState({
                        hasSubmitted: true
                    }, () => {
                        let formValues = {};

                        for (let key in fields) {
                            formValues[key] = fields[key].value;
                        }

                        this.props.authRegister(formValues)
                    });
                }
            } else {
                alert("form is not valid");
            }
        }
    }

    render() {
        const { fields } = this.state;
        return (
            <form onSubmit={this.onSubmit} className="form form--login col-md-4 offset-md-4" noValidate>
                <h2>Register</h2>
                <div className="form-group">
                    <label htmlFor="input_name">Name</label>
                    <input id="input_name" className="form-control" name="name" type="text"
                        value={fields.name.value} onChange={this.onChange} onBlur={this.onBlur} required />
                    {!fields.name.valid &&
                        <p>
                            {fields.name.errorMessage}
                        </p>
                    }
                </div>
                <div className="form-group">
                    <label htmlFor="input_email">Email Address</label>
                    <input id="input_email" className="form-control" name="email" type="email"
                        value={fields.email.value} onChange={this.onChange} onBlur={this.onBlur} required />
                    {!fields.email.valid &&
                        <p>
                            {fields.email.errorMessage}
                        </p>
                    }
                </div>
                <div className="form-group">
                    <label htmlFor="input_password">Password</label>
                    <input id="input_password" className="form-control" name="password" type="password"
                        value={fields.password.value} onChange={this.onChange} onBlur={this.onBlur} required />
                    {!fields.password.valid &&
                        <p>
                            {fields.password.errorMessage}
                        </p>
                    }
                </div>
                <div className="form-group">
                    <label htmlFor="input_confirmPassword">Confirm Password</label>
                    <input id="input_confirmPassword" className="form-control" name="confirmPassword" type="password"
                        value={fields.confirmPassword.value} onChange={this.onChange} onBlur={this.onBlur} required />
                    {!fields.confirmPassword.valid &&
                        <p>
                            {fields.confirmPassword.errorMessage}
                        </p>
                    }
                </div>
                <button className="btn btn-primary">Register</button>
            </form>
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