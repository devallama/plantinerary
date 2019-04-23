import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { tripsCreate } from 'Actions/trips-actions';

import Form from 'Components/Form';
import FormInput from 'Components/FormInput';

class CreateTripForm extends React.Component {
    constructor(props) {
        super(props);

        this.fields = {
            name: {
                errorMessages: {
                    required: "A name for the trip is required",
                    format: "This name must be a valid name"
                }
            },
            type: {},
            startDate: {
                errorMessages: {
                    required: "Please select a start date for the trip",
                    format: "This must be a valid date"
                }
            },
            endDate: {
                errorMessages: {
                    required: "Please select an end date for the trip",
                    format: "This must be a valid date"
                }
            },
            country: {
                errorMessages: {
                    required: "Please select the country for your trip"
                }
            }
        };

        this.formModal = React.createRef();
        this.closeModal = React.createRef();
    }

    hideModal = () => {
        this.closeModal.current.click();
    }

    render() {
        return (
            <div className="modal fade" tabIndex="-1" id="form-createTrip" ref={this.formModal}>
                <div className="modal-dialog modal-dialog-scrollable" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalScrollableTitle">Modal title</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <Form fields={this.fields} className="form form--createTrip" noValidate multiSubmit={true}
                                submitMethod={(fields) => { this.hideModal(); this.props.tripsCreate(fields); }}>
                                <h3>Create a trip</h3>
                                <FormInput label="Name" name="name" required />
                                <FormInput label="Type" name="type" />
                                <FormInput label="Start date" name="startDate" type="date" required />
                                <FormInput label="End date" name="endDate" type="date" required />
                                <FormInput label="Country" name="country" required />
                                <button className="btn btn-primary" type="submit">Create</button>
                            </Form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" ref={this.closeModal} data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>

            </div>

        );
    }
}

CreateTripForm.propTypes = {
    tripsCreate: PropTypes.func.isRequired,
    response: PropTypes.object.isRequired
};

const mapStateToProps = state => {
    return ({
        response: state.trips.response
    });
};

export default connect(mapStateToProps, { tripsCreate })(CreateTripForm);