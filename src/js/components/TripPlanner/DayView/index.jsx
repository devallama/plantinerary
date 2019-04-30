import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { itineraryFetch } from 'Actions/itinerary-actions';
import { itineraryItemDelete } from 'Actions/itinerary-actions';

import Search from './Search';

class DayView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedTime: null
        };

        this.props.itineraryFetch(this.props.tripId);
    }

    selectTime = (event, time) => {
        if (event.target.tagName.toLowerCase() != 'button') {
            this.setState({
                selectedTime: time
            });

            this.props.openSearch();
        }
    }

    render() {
        const hourEls = (() => {
            let hourEls = [];

            for (let i = 0; i < 24; i++) {
                let itineraryItem = this.props.itinerary.find(itineraryItem => itineraryItem.hour == i && itineraryItem.date == this.props.selectedDate);

                const hourEl = (
                    <li onClick={event => this.selectTime(event, i)} style={{ cursor: 'pointer' }} key={i} className="list-group-item">
                        {`${i}:00`}
                        {itineraryItem &&
                            <div className="itinerary-list">
                                <div className="itinerary-list__item itinerary-list__item--name">
                                    <h5 className="itinerary-list__header">{itineraryItem.event.name}</h5>
                                </div>
                                <div className="itinerary-list__item">
                                    <button className="btn btn-primary btn-sm mr-2">View details</button>
                                    <button className="btn btn-secondary btn-sm mr-2" onClick={() => this.props.focusItineraryItem(itineraryItem)}>Focus on map</button>
                                    <button className="btn btn-danger btn-sm" onClick={() => this.props.itineraryItemDelete(this.props.tripId, itineraryItem.id)}>Delete</button>
                                </div>
                            </div>
                        }

                    </li>
                );

                hourEls.push(hourEl);
            }
            return hourEls;
        })();

        return (
            <aside className="planner__sidebar">
                {this.props.searchActive ?
                    <Search tripId={this.props.tripId} selectedDate={this.props.selectedDate} selectedTime={this.state.selectedTime} closeSearch={this.props.closeSearch} />
                    :
                    <div className="planner__times">
                        <ul className="list-group">
                            {hourEls}
                        </ul>
                    </div>
                }
            </aside>
        );
    }
}

DayView.propTypes = {
    itineraryFetch: PropTypes.func.isRequired,
    itinerary: PropTypes.array.isRequired,
    itineraryItemDelete: PropTypes.func.isRequired,
    response: PropTypes.object.isRequired
};

const mapStateToProps = state => {
    return ({
        itinerary: state.itinerary.itineraryData,
        response: state.itinerary.response
    });
};

export default connect(mapStateToProps, { itineraryFetch, itineraryItemDelete })(DayView);
