import { AUTH_LOGIN, AUTH_REGISTER, AUTH_LOGIN_ANON } from 'Actions/types';
import { AUTH_LOGOUT } from '../actions/types';

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
        case AUTH_LOGIN_ANON:
        case AUTH_LOGOUT:
            return {
                ...state,
                response: action.data.response
            };
        default:
            return state;
    }
}