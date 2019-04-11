import { USER_IS_LOGGED_IN } from 'Actions/types';

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
        default:
            return state;
    }
}