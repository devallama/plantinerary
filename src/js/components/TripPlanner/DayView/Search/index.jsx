import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { autouraSearchStops } from 'Actions/autoura-actions';
import { itineraryItemSet } from 'Actions/itinerary-actions';

import Results from './Results';

class Search extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            type: 'food',
            searchTerm: ''
        };

        this.search();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.itineraryResponse != nextProps.itineraryResponse) {
            if (nextProps.itineraryResponse.response == "itinerary/success") {
                this.props.closeSearch();
            }
        }
    }

    onChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    search = () => {
        let searchTerms = {
            'stop_types': this.state.type
        };

        this.props.autouraSearchStops(searchTerms);
    }

    selectType = (e, type) => {
        e.preventDefault();

        /* Api doesn't let you change the stop type from food?? This API is terrible */
        return;

        this.setState({
            type: type
        }, this.search);
    }

    selectEvent = (itineraryEvent) => {
        this.props.itineraryItemSet(this.props.tripId, this.props.selectedDate, this.props.selectedTime, itineraryEvent);
    }

    render() {
        const results = this.props.response.success ? this.props.response.response.filter(item => item.name.toLowerCase().includes(this.state.searchTerm.toLowerCase())) : [];
        return (
            <div className="p-1">
                <a href="javascript:" onClick={this.props.closeSearch}>Back</a>
                <div className="input-group my-1">
                    <div className="input-group-prepend">
                        <button className="btn btn-outline-secondary dropdown-toggle btn-sm" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Stop Type</button>
                        <div className="dropdown-menu">
                            <a className="dropdown-item" href="#" onClick={(e) => this.selectType(e, "food")}>Food</a>
                            <a className="dropdown-item" href="#" onClick={(e) => this.selectType(e, "accom")}>Accomodation</a>
                            <a className="dropdown-item" href="#" onClick={(e) => this.selectType(e, "poi")}>Place of Interest</a>
                            <a className="dropdown-item" href="#" onClick={(e) => this.selectType(e, "attraction")}>Attraction</a>
                            <a className="dropdown-item" href="#" onClick={(e) => this.selectType(e, "event")}>Ticket and Event</a>
                            <a className="dropdown-item" href="#" onClick={(e) => this.selectType(e, "tour")}>Tour and Activity</a>
                        </div>
                    </div>
                    <input type="text" name="searchTerm" className="form-control" value={this.state.searchTerm} onChange={this.onChange} placeholder="Search" aria-label="Search" />
                </div>

                <div className="mt-2">
                    <Results results={results} selectEvent={this.selectEvent} />
                </div>
            </div>
        );
    }
}

Search.propTypes = {
    autouraSearchStops: PropTypes.func.isRequired,
    response: PropTypes.object.isRequired,
    itineraryItemSet: PropTypes.func.isRequired,
    itineraryResponse: PropTypes.object.isRequired
};

const mapStateToProps = state => {
    return ({
        response: state.autoura.response,
        itineraryResponse: state.itinerary.response
    });
};

export default connect(mapStateToProps, { autouraSearchStops, itineraryItemSet })(Search);