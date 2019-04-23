import { USER_IS_LOGGED_IN } from 'Actions/types';
import { USER_FETCH } from '../actions/types';

const initialState = {
    isLoggedIn: null,
    user: {}
};

export default (state = initialState, action) => {
    switch (action.type) {
        case USER_IS_LOGGED_IN:
            return {
                ...state,
                isLoggedIn: action.data
            };
        case USER_FETCH:
            return {
                ...state,
                user: action.data
            };
        default:
            return state;
    }
}