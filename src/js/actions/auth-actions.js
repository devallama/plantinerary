import { AUTH_LOGIN, AUTH_REGISTER } from './types';

export const authLogin = (loginDetails) => (dispatch, getState) => {
    console.log("Logging state");
    console.log(getState());
    let firebaseInstance = getState().firebase.instance;

    firebaseInstance.auth().signInWithEmailAndPassword(loginDetails.email, loginDetails.password)
        .then(resp => {
            console.log(resp);
            dispatch({
                type: AUTH_LOGIN,
                response: {
                    status: 1,
                    message: 'Successfully authenticated'
                }
            });
        })
        .catch(err => {
            dispatch({
                type: AUTH_LOGIN,
                data: {
                    response: {
                        status: err.code,
                        message: err.message
                    }
                }
            });
        });
};