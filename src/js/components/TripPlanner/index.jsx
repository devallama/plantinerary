import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { tripFetch } from 'Actions/trips-actions';

import QueryString from 'query-string';
import dayjs from 'dayjs';

import DayView from './DayView';
import MapView from './MapView';

class TripPlanner extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            redirect: false,
            selectedDate: null,
            searchActive: false,
            focusedItineraryItem: null
        };

        const queryString = QueryString.parse(location.search);

        if (queryString['trip-id']) {
            this.props.tripFetch(queryString['trip-id']);
        } else {
            this.state.redirect = true;
        }
    }

    openSearch = () => {
        this.setState({
            searchActive: true
        });
    }

    closeSearch = () => {
        this.setState({
            searchActive: false
        });
    }

    componentWillUpdate(nextProps) {
        if (this.state.selectedDate == null && nextProps.trip.startDate) {
            this.setState({
                selectedDate: nextProps.trip.startDate
            });
        }
    }

    selectDate = (event, date) => {
        event.preventDefault();

        this.setState({
            selectedDate: date,
            searchActive: false
        });
    }

    focusItineraryItem = itineraryItem => {
        this.setState({
            focusedItineraryItem: itineraryItem
        });
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={"/dashboard"} />
        } else if (Object.entries(this.props.trip).length > 0) {
            const { trip } = this.props;
            const startDate = dayjs(trip.startDate);
            const endDate = dayjs(trip.endDate);

            if (startDate > endDate) {
                return (
                    <div className="container">
                        <h4>There's an error with this trip.</h4>
                        <p>
                            The start date is after the end date. Please go back to the <Link to="/dashboard">Dashboard</Link> and correct
                            this by editing the trip start and end dates.
                        </p>
                    </div>
                );
            } else if (!startDate.isValid() || !endDate.isValid()) {
                return (
                    <div className="container">
                        <h4>There's an error with this trip.</h4>
                        <p>
                            The start and end dates are invalid. Please go back to the <Link to="/dashboard">Dashboard</Link> and correct
                            this by editing the trip start and end dates.
                        </p>
                    </div>
                );
            }

            const createDateEls = (currentDate = dayjs(startDate), dateEls = []) => {
                const key = dayjs(currentDate).format("DDMMYYYY");
                const date = dayjs(currentDate).format("YYYY-MM-DD");
                const readableDate = dayjs(currentDate).format("DD/MM/YYYY");

                const dateEl = (
                    <a href="#" className={`list-group-item list-group-item-action flex-fill ${this.state.selectedDate == date ? "active" : ""}`}
                        key={key} onClick={(e) => this.selectDate(e, date)}
                    >
                        {readableDate}
                    </a>
                );

                dateEls.push(dateEl);

                currentDate = currentDate.add(1, 'day');

                if (currentDate.isAfter(endDate)) {
                    return dateEls;
                } else {
                    return createDateEls(currentDate, dateEls);
                }
            };

            const dateEls = createDateEls();

            return (
                <div>
                    <h3>{this.props.trip.name}</h3>
                    <div className="list-group list-group-horizontal overflow-auto scrollbar pb-2">
                        {dateEls}
                    </div>

                    <div className="planner__container">
                        <DayView selectedDate={this.state.selectedDate} tripId={this.props.trip.id} focusItineraryItem={this.focusItineraryItem}
                            searchActive={this.state.searchActive} openSearch={this.openSearch} closeSearch={this.closeSearch}
                        />

                        <main className="planner__main">
                            <MapView tripId={this.props.trip.id} selectedDate={this.state.selectedDate} focusedItineraryItem={this.state.focusedItineraryItem} />
                        </main>
                    </div>
                </div>
            );
        } else {
            return <div></div>;
        }
    }
}

/* Get trip by query string, if empty or error (how to handle denied error???) then redirec to dhasboard. Otherwise, fetch all events in the trip and display */

TripPlanner.propTypes = {
    tripFetch: PropTypes.func.isRequired,
    trip: PropTypes.object.isRequired,
    response: PropTypes.object.isRequired
};

const mapStateToProps = state => {
    return ({
        trip: state.trips.tripData,
        response: state.trips.response
    });
};

export default connect(mapStateToProps, { tripFetch })(TripPlanner);