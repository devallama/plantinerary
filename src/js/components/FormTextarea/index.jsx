import React from 'react';

class FormTextarea extends React.Component {
    render() {
        const {
            fields,
            onBlur,
            onChange,
            errorClassName,
            label,
            ...textareaProps
        } = this.props;
        const field = fields[this.props.name];

        return (
            <div className="form-group">
                <label htmlFor={`textarea_${this.props.name}`}>{this.props.label}</label>
                <textarea id={`textarea_${this.props.name}`} className="form-control" {...textareaProps}
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

export default FormTextarea;