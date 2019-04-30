import { TRIP_FETCH, TRIPS_FETCH, TRIP_CREATE, TRIP_EDIT, TRIP_DELETE } from './types';

export const tripFetch = (id) => (dispatch, getState) => {
    const db = getState().firebase.instance.firestore();

    db.collection("trips").doc(id)
        .onSnapshot((doc) => {
            doc = { id: doc.id, ...doc.data() };

            dispatch({
                type: TRIP_FETCH,
                data: doc
            });
        });
};

export const tripsFetch = () => (dispatch, getState) => {
    const db = getState().firebase.instance.firestore();
    const user = getState().user.user;

    db.collection("trips").where("uid", "==", user.uid)
        .onSnapshot((querySnapshot) => {
            const data = querySnapshot.docs.map(doc => { return { id: doc.id, ...doc.data() } });

            dispatch({
                type: TRIPS_FETCH,
                data: data
            });
        });
};

export const tripsCreate = (tripData) => (dispatch, getState) => {
    const db = getState().firebase.instance.firestore();
    const uid = getState().user.user.uid;

    db.collection("trips").add({ ...tripData, uid: uid })
        .then(docRef => {
            dispatch({
                type: TRIP_CREATE,
                data: {
                    docRef: docRef,
                    status: 'db/success'
                }
            });
        })
        .catch(err => {
            dispatch({
                type: TRIP_CREATE,
                data: {
                    error: err,
                    status: 'db/error'
                }
            });
        });
}

export const tripsDelete = (tripId) => (dispatch, getState) => {
    const db = getState().firebase.instance.firestore();

    db.collection("trips").doc(tripId).delete()
        .then(() => {
            dispatch({
                type: TRIP_DELETE,
                data: {
                    status: 'db/success'
                }
            });
        })
        .catch(err => {
            dispatch({
                type: TRIP_DELETE,
                data: {
                    error: err,
                    status: 'db/error'
                }
            });
        });
}