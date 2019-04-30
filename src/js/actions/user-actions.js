import { USER_IS_LOGGED_IN, USER_FETCH } from './types';

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

export const userFetch = () => (dispatch, getState) => {
    const firebaseInstance = getState().firebase.instance;
    const currentUser = firebaseInstance.auth().currentUser;

    dispatch({
        type: USER_FETCH,
        data: currentUser
    });
}