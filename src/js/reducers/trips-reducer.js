import { TRIPS_FETCH, TRIPS_CREATE } from 'Actions/types';

const initialState = {
    tripsData: [],
    response: {}
};

export default (state = initialState, action) => {
    switch (action.type) {
        case TRIPS_FETCH:
            return {
                ...state,
                tripsData: action.data
            };
        case TRIPS_CREATE:
            return {
                ...state,
                response: action.data
            };
        default:
            return state;
    }
}