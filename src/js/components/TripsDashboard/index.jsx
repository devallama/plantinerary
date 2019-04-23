import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { tripsFetch } from 'Actions/trips-actions';
import { userFetch } from 'Actions/user-actions';

import CreateTripForm from '../CreateTripForm';
import TripCard from './subcomponents/trip-card';

class TripsDashboard extends React.Component {
    constructor(props) {
        super(props);

        this.props.userFetch();
        this.props.tripsFetch();
    }

    render() {
        console.log(this.props);

        const tripCards = this.props.trips.map((trip, index) => <TripCard {...trip} key={index} />);

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
    userFetch: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
};

const mapStateToProps = state => {
    console.log(state);
    return ({
        trips: state.trips.tripsData,
        user: state.user.user
    })
}

export default connect(mapStateToProps, { tripsFetch, userFetch })(TripsDashboard);