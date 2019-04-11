import { AUTH_LOGIN, AUTH_IS_LOGGED_IN } from 'Actions/types';

const initialState = {
    response: {
        status: 0,
        message: ''
    }
};

export default (state = initialState, action) => {
    switch (action.type) {
        case AUTH_LOGIN:
            return {
                ...state,
                response: action.data.response
            };
        default:
            return state;
    }
}