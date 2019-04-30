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

    onSearch = () => {
        let searchTerms = {
            'stop_types': this.state.type
        };

        if (this.state.searchTerm != '') {
            searchTerms['name'] = this.state.searchTerm;
        }

        this.props.autouraSearchStops(searchTerms);
    }

    selectEvent = (itineraryEvent) => {
        this.props.itineraryItemSet(this.props.tripId, this.props.selectedDate, this.props.selectedTime, itineraryEvent);
    }

    render() {
        return (
            <div>
                Search

                <button onClick={this.onSearch}>Search</button>

                Search results go here
                {this.props.response.success &&
                    <Results results={this.props.response.response} selectEvent={this.selectEvent} />
                }
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