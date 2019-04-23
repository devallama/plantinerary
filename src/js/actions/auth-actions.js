import { AUTH_LOGIN, AUTH_REGISTER, AUTH_LOGIN_ANON, AUTH_LOGOUT } from './types';

export const authLogin = (loginDetails) => (dispatch, getState) => {
    let firebaseInstance = getState().firebase.instance;

    firebaseInstance.auth().signInWithEmailAndPassword(loginDetails.email, loginDetails.password)
        .then(() => {
            dispatch({
                type: AUTH_LOGIN,
                response: {
                    status: 'auth/success',
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

export const authRegister = (registerDetails) => (dispatch, getState) => {
    let firebaseInstance = getState().firebase.instance;

    if (registerDetails.password === registerDetails.confirmPassword) {
        firebaseInstance.auth().createUserWithEmailAndPassword(registerDetails.email, registerDetails.password)
            .then(userCredential => {
                const { user } = userCredential;

                return user.updateProfile({
                    displayName: registerDetails.name
                });
            })
            .then(() => {
                dispatch({
                    type: AUTH_REGISTER,
                    response: {
                        status: 'auth/success',
                        message: 'Successfully registered'
                    }
                });
            })
            .catch(err => {
                dispatch({
                    type: AUTH_REGISTER,
                    data: {
                        response: {
                            status: err.code,
                            message: err.message
                        }
                    }
                });
            });
    } else {
        dispatch({
            type: AUTH_REGISTER,
            data: {
                response: {
                    status: 'auth/password-not-match',
                    message: "Passwords do not match"
                }
            }
        });
    }
}

export const authLoginAnon = () => (dispatch, getState) => {
    let firebaseInstance = getState().firebase.instance;

    firebaseInstance.auth().signInAnonymously()
        .then(() => {
            dispatch({
                type: AUTH_LOGIN_ANON,
                response: {
                    status: 'auth/success',
                    message: 'Successfully logged in anonymously'
                }
            });
        })
        .catch(err => {
            dispatch({
                type: AUTH_LOGIN_ANON,
                data: {
                    response: {
                        status: err.code,
                        message: err.message
                    }
                }
            });
        });
}

export const authLogout = () => (dispatch, getState) => {
    let firebaseInstance = getState().firebase.instance;

    firebaseInstance.auth().signOut()
        .then(() => {
            dispatch({
                type: AUTH_LOGOUT,
                response: {
                    status: 'auth/success',
                    message: 'Successfully logged out'
                }
            });
        })
        .catch(err => {
            dispatch({
                type: AUTH_LOGOUT,
                data: {
                    response: {
                        status: err.code,
                        message: err.message
                    }
                }
            });
        });
}