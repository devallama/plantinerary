import { FIREBASE_FETCH_INSTANCE } from 'Actions/types';

const initialState = {
    instance: {}
};

export default (state = initialState, action) => {
    switch (action.type) {
        case FIREBASE_FETCH_INSTANCE:
            return {
                ...state,
                instance: action.data.instance
            };
        default:
            return state;
    }
}