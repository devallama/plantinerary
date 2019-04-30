import { ITINERARY_FETCH, ITINERARY_ITEM_CREATE, ITINERARY_ITEM_DELETE } from 'Actions/types';

const initialState = {
    itineraryData: [],
    response: {}
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ITINERARY_FETCH:
            return {
                ...state,
                itineraryData: action.data
            };
        case ITINERARY_ITEM_CREATE:
        case ITINERARY_ITEM_DELETE:
            return {
                ...state,
                response: action.data
            };
        default:
            return state;
    }
}