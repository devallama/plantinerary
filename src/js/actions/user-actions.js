import { USER_IS_LOGGED_IN } from './types';

export const userIsLoggedIn = () => (dispatch, getState) => {
    let firebaseInstance = getState().firebase.instance;

    firebaseInstance.auth().onAuthStateChanged(user => {
        if (user) {
            dispatch({
                type: USER_IS_LOGGED_IN,
                data: true
            });
        } else {
            dispatch({
                type: USER_IS_LOGGED_IN,
                data: false
            });
        }
    });
}