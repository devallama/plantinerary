import React from 'react';

class Form extends React.Component {
    constructor(props) {
        super(props);

        const defaultFieldState = {
            value: "",
            touched: false,
            valid: true,
            errorMessage: ""
        };

        this.state = {
            hasSubmitted: false,
            fields: { ...props.fields }
        };

        Object.keys(this.state.fields).forEach(key =>
            this.state.fields[key] = { ...this.state.fields[key], ...defaultFieldState }
        );
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
                if (!validations[key](field, this.state.fields)) {
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

    resetForm = () => {
        let fields = { ...this.state.fields };

        Object.keys(fields).forEach(key => { if (!fields[key].keep) { fields[key].value = '' } });

        this.setState({
            fields: fields,
            hasSubmitted: false
        });
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

                        this.props.submitMethod(formValues);

                        /* If form can be submitted multiple times, reset it */
                        if (this.props.multiSubmit) {
                            this.resetForm();
                        }
                    });
                }
            }
        }
    }

    render() {
        const children = React.Children.map(this.props.children, child => {
            /* Only apply props to children that are react components */
            if (typeof child.type == 'function') {
                return React.cloneElement(child, {
                    fields: this.state.fields,
                    onBlur: this.onBlur,
                    onChange: this.onChange
                });
            } else {
                return React.cloneElement(child);
            }
        });

        return (
            <form noValidate={this.props.noValidate} className={this.props.className} onSubmit={this.onSubmit}>
                {children}
            </form>
        )
    }
}

export default Form;