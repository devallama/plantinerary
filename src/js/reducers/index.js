import { combineReducers } from 'redux';

import userReducer from './user-reducer';
import firebaseReducer from './firebase-reducer';
import authReducer from './auth-reducer';
import tripsReducer from './trips-reducer';

export default combineReducers({
    auth: authReducer,
    firebase: firebaseReducer,
    user: userReducer,
    trips: tripsReducer
});