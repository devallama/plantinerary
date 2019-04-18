import React from 'react';

class FormInput extends React.Component {
    render() {
        const {
            fields,
            onBlur,
            onChange,
            errorClassName,
            label,
            inputType,
            ...inputProps
        } = this.props;
        const field = fields[this.props.name];

        return (
            <div className="form-group">
                <label htmlFor={`input_${this.props.name}`}>{this.props.label}</label>
                <input id={`input_${this.props.name}`} className="form-control" type={inputType || "text"} {...inputProps}
                    value={field.value} onChange={onChange} onBlur={onBlur} />
                {!field.valid &&
                    <p className={errorClassName || 'alert alert-danger'}>
                        {field.errorMessage}
                    </p>
                }
            </div>
        );
    }
}

export default FormInput;