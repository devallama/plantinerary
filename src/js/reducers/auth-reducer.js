import { AUTH_LOGIN, AUTH_REGISTER } from 'Actions/types';

const initialState = {
    response: {
        status: 0,
        message: ''
    }
};

export default (state = initialState, action) => {
    switch (action.type) {
        case AUTH_LOGIN:
        case AUTH_REGISTER:
            return {
                ...state,
                response: action.data.response
            };

        default:
            return state;
    }
}