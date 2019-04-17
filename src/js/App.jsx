import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { firebaseFetchInstance } from 'Actions/firebase-actions';

import ProtectedRoute from './routes/ProtectedRoute';
import NouserRoute from './routes/NouserRoute';

import Page from './pages/templates/page';
import PageLanding from './pages/landing';
import PageLogin from './pages/login';
import PageRegister from './pages/register';
import PageDashboard from './pages/dashboard';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.props.firebaseFetchInstance();
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
                            path="/register"
                            component={PageRegister}
                            title="Register"
                            redirect="/dashboard"
                        />
                        <ProtectedRoute
                            path="/dashboard"
                            component={PageDashboard}
                            title="Trips Dashboard"
                            redirect="/"
                        />
                    </Switch>
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
    firebase: state.firebase.instance
});

export default connect(mapStateToProps, { firebaseFetchInstance })(App);