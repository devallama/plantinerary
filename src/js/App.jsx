import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Page from './pages/page';
import PageLanding from './pages/landing';
import PageLogin from './pages/login';

class App extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <nav className="nav">
                        <ul>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/login">Login</Link>
                            </li>
                        </ul>
                    </nav>

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
                            <Page {...props} component={PageLogin} title="Login" />
                        )}
                    />
                </div>
            </Router>
        )
    }
}

export default App;