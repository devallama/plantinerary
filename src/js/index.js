import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import store from './store';

// import firebase from 'firebase';
// import firebaseConfig from './firebase.confid';

import 'bootstrap';

import App from './App';

// firebase.initializeApp(firebaseConfig);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);