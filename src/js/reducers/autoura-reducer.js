import { AUTOURA_SEARCH_STOPS } from 'Actions/types';

const initialState = {
    response: {}
};

export default (state = initialState, action) => {
    switch (action.type) {
        case AUTOURA_SEARCH_STOPS:
            return {
                ...state,
                response: action.data.data
            };
        default:
            return state;
    }
}