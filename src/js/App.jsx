import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { firebaseFetchInstance } from 'Actions/firebase-actions';
import { userIsLoggedIn } from 'Actions/user-actions';

import ProtectedRoute from './routes/ProtectedRoute';

import Page from './pages/templates/page';
import PageLanding from './pages/landing';
import PageLogin from './pages/login';
import PageDashboard from './pages/dashboard';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.props.firebaseFetchInstance();

        console.log("called");
        console.log(this.props.userIsLoggedIn());

        console.log(this.props);
    }

    render() {
        return (
            <Router>
                <div>
                    <div className="topbar">
                        <div className="topbar__logo">
                            Plantinerary
                        </div>
                        <div className="topbar__navigation">
                            <nav className="site-nav">
                                <ul className="site-nav__list">
                                    <li className="site-nav__item">
                                        <Link to="/" className="site-nav__link">Home</Link>
                                    </li>
                                    <li className="site-nav__item">
                                        <Link to="/login" className="site-nav__link">Login</Link>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>

                    <Route
                        path="/"
                        exact
                        render={props => (
                            <Page {...props} component={PageLanding} title="Home" />
                        )}
                    />
                    <Route
                        path="/login"
                        render={props => (
                            this.props.user.isLoggedIn
                                ? (
                                    <Redirect to="/dashboard" />
                                ) : (
                                    <Page {...props} component={PageLogin} title="Login" />
                                )
                        )}
                    />
                    <ProtectedRoute
                        path="/dashboard"
                        component={PageDashboard}
                        title="Trips Dashboard"
                    />
                </div>
            </Router>
        )
    }
}

App.propTypes = {
    firebaseFetchInstance: PropTypes.func.isRequired,
    firebase: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    firebase: state.firebase.instance,
    user: state.user
});

export default connect(mapStateToProps, { firebaseFetchInstance, userIsLoggedIn })(App);