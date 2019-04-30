import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { itineraryFetch } from 'Actions/itinerary-actions';

import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

class MapView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            lat: 51.505,
            lng: -0.09,
            zoom: 13,
            focusPoint: null
        }

        this.props.itineraryFetch(this.props.tripId);
    }

    componentWillUpdate(nextProps) {
        /* Set new focued itinerary item as focus point */
        if (this.props.focusedItineraryItem != nextProps.focusedItineraryItem) {
            const event = nextProps.focusedItineraryItem.event;

            if (event.location && event.location.geocode) {
                this.setState({
                    focusPoint: event.location.geocode
                });
            }
        }

        /* Focus on first itinerary item */
        if (this.props.itinerary != nextProps.itinerary) {
            /* Have to check for geocode and location as not all events have it. */
            let itineraryItem = nextProps.itinerary.find(item => item.event.location && item.event.location.geocode);

            if (itineraryItem) {
                this.setState({
                    lat: itineraryItem.event.location.geocode.lat,
                    lng: itineraryItem.event.location.geocode.lng
                });
            }

        }
    }

    viewportChange = (viewport, zoom) => {
        this.setState({
            zoom: zoom
        });
    }

    render() {
        const position = [this.state.lat, this.state.lng];
        const itineraryItems = this.props.itinerary.filter(itineraryItem => itineraryItem.date == this.props.selectedDate);

        const markerEls = itineraryItems.map((itineraryItem, index) => {
            if (itineraryItem.event.location && itineraryItem.event.location.geocode) {
                return (
                    <Marker position={itineraryItem.event.location.geocode} key={index}>
                        <Popup>
                            <h5>{itineraryItem.event.name}</h5>
                            <p>
                                {itineraryItem.event.summary}
                            </p>
                            <div className="bg-secondary p-2">
                                <span className="text-white">Planned for: {`${itineraryItem.hour}:00`}</span>
                            </div>
                        </Popup>
                    </Marker>
                );
            }
        });

        return (
            <Map onViewportChange={this.viewportChange} center={this.state.focusPoint || position}
                zoom={this.state.zoom} className="planner__map" style={{ height: '45rem' }}
            >
                <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {markerEls}
            </Map>
        );
    }
}

MapView.propTypes = {
    itineraryFetch: PropTypes.func.isRequired,
    itinerary: PropTypes.array.isRequired
};

const mapStateToProps = state => {
    return ({
        itinerary: state.itinerary.itineraryData
    });
};

export default connect(mapStateToProps, { itineraryFetch })(MapView);