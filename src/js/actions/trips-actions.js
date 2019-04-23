import { TRIPS_FETCH, TRIPS_CREATE, TRIPS_EDIT, TRIPS_DELETE } from './types';

export const tripsFetch = (id = null) => (dispatch, getState) => {
    const db = getState().firebase.instance.firestore();
    const user = getState().user.user;

    console.log(getState().user);

    db.collection("trips").where("uid", "==", user.uid)
        .onSnapshot(querySnapshot => {
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
                type: TRIPS_CREATE,
                data: {
                    docRef: docRef,
                    status: 'db/success'
                }
            });
        })
        .catch(err => {
            dispatch({
                type: TRIPS_CREATE,
                data: {
                    error: err,
                    status: 'db/error'
                }
            });
        });
}