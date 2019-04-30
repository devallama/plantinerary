import { TRIP_FETCH, TRIPS_FETCH, TRIP_CREATE, TRIP_DELETE } from 'Actions/types';

const initialState = {
    tripData: {},
    tripsData: [],
    response: {}
};

export default (state = initialState, action) => {
    switch (action.type) {
        case TRIP_FETCH:
            return {
                ...state,
                tripData: action.data
            };
        case TRIPS_FETCH:
            return {
                ...state,
                tripsData: action.data
            };
        case TRIP_CREATE:
        case TRIP_DELETE:
            return {
                ...state,
                response: action.data
            };
        default:
            return state;
    }
}