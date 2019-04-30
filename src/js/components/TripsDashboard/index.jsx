import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { tripsFetch, tripsDelete } from 'Actions/trips-actions';
import { userFetch } from 'Actions/user-actions';

import CreateTripForm from 'Components/CreateTripForm';
import TripCard from './TripCard';

class TripsDashboard extends React.Component {
    constructor(props) {
        super(props);

        this.props.userFetch();
        this.props.tripsFetch();
    }

    render() {
        const tripCards = this.props.trips.map((trip, index) => <TripCard {...trip} key={index} deleteMethod={() => this.props.tripsDelete(trip.id)} />);

        return (
            <div>
                <div className="row align-items-center">
                    <div className="col">
                        <h2 className="page-heading">Your trips</h2>
                    </div>
                    <div className="col text-right">
                        <button className="btn btn-primary" data-toggle="modal" data-target="#form-createTrip">Create new trip</button>
                    </div>
                </div>
                <div className="row mt-4">
                    {tripCards}
                </div>

                <CreateTripForm />
            </div>
        );
    }
}

TripsDashboard.propTypes = {
    tripsFetch: PropTypes.func.isRequired,
    trips: PropTypes.array.isRequired,
    tripsDelete: PropTypes.func.isRequired,
    response: PropTypes.object.isRequired,
    userFetch: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
};

const mapStateToProps = state => {
    return ({
        trips: state.trips.tripsData,
        response: state.trips.response,
        user: state.user.user
    })
}

export default connect(mapStateToProps, { tripsFetch, tripsDelete, userFetch })(TripsDashboard);