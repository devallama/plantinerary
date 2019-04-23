import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { firebaseFetchInstance } from 'Actions/firebase-actions';

import ProtectedRoute from './routes/ProtectedRoute';
import NouserRoute from './routes/NouserRoute';

import Page from './pages/templates/page';
import PageLanding from './pages/landing';
import PageLogin from './pages/login';
import PageRegister from './pages/register';
import PageLogout from './pages/logout';
import PageDashboard from './pages/dashboard';
import PageLoginAnon from './pages/login-anon';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.props.firebaseFetchInstance();
    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route
                        path="/"
                        exact
                        render={props => (
                            <Page {...props} component={PageLanding} title="Home" />
                        )}
                    />
                    <NouserRoute
                        path="/login"
                        component={PageLogin}
                        title="Login"
                        redirect="/dashboard"
                    />
                    <NouserRoute
                        path="/login-anon"
                        component={PageLoginAnon}
                        title="Login Anonymously"
                        redirect="/dashboard"
                    />
                    <NouserRoute
                        path="/register"
                        component={PageRegister}
                        title="Register"
                        redirect="/dashboard"
                    />
                    <ProtectedRoute
                        path="/logout"
                        component={PageLogout}
                        title="Logout from Plantinerary"
                        redirect="/"
                    />
                    <ProtectedRoute
                        path="/dashboard"
                        component={PageDashboard}
                        title="Trips Dashboard"
                        redirect="/"
                    />
                </Switch>
            </Router>
        )
    }
}

App.propTypes = {
    firebaseFetchInstance: PropTypes.func.isRequired,
    firebase: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    firebase: state.firebase.instance
});

export default connect(mapStateToProps, { firebaseFetchInstance })(App);