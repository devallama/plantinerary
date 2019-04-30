import { ITINERARY_FETCH, ITINERARY_ITEM_SET, ITINERARY_ITEM_CREATE, ITINERARY_ITEM_UPDATE, ITINERARY_ITEM_DELETE } from './types';

export const itineraryFetch = (tripId) => (dispatch, getState) => {
    const db = getState().firebase.instance.firestore();

    db.collection("trips").doc(tripId).collection("itinerary")
        .onSnapshot((querySnapshot) => {
            const data = querySnapshot.docs.map(doc => { return { id: doc.id, ...doc.data() } });

            dispatch({
                type: ITINERARY_FETCH,
                data: data
            });
        });
};

export const itineraryItemSet = (tripId, date, hour, event) => (dispatch, getState) => {
    const db = getState().firebase.instance.firestore();

    db.collection("trips").doc(tripId).collection("itinerary").where("date", "==", date).where("hour", "==", hour).get()
        .then(querySnapshot => {
            if (querySnapshot.empty) {
                dispatch(itineraryItemCreate(tripId, date, hour, event));
            } else {
                dispatch(itineraryItemUpdate(tripId, querySnapshot.docs[0].id, event));
            }
        })
        .catch(err => {
            dispatch({
                type: ITINERARY_ITEM_SET,
                data: {
                    response: err
                }
            });
        });
};

export const itineraryItemCreate = (tripId, date, hour, event) => (dispatch, getState) => {
    const db = getState().firebase.instance.firestore();

    db.collection("trips").doc(tripId).collection("itinerary").add({
        date: date,
        hour: hour,
        event: event
    })
        .then(() => {
            dispatch({
                type: ITINERARY_ITEM_CREATE,
                data: {
                    response: 'itinerary/success'
                }
            });
        })
        .catch((err) => {
            dispatch({
                type: ITINERARY_ITEM_CREATE,
                data: {
                    response: err
                }
            });
        });
}

export const itineraryItemUpdate = (tripId, itineraryItemId, event) => (dispatch, getState) => {
    const db = getState().firebase.instance.firestore();

    db.collection("trips").doc(tripId).collection("itinerary").doc(itineraryItemId).update({
        event: event
    })
        .then(() => {
            dispatch({
                type: ITINERARY_ITEM_UPDATE,
                data: {
                    response: 'itinerary/success'
                }
            });
        })
        .catch((err) => {
            dispatch({
                type: ITINERARY_ITEM_UPDATE,
                data: {
                    response: err
                }
            });
        });
}