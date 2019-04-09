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
                    <nav className="navbar navbar-light bg-light">
                        <Link to="/" class="navbar-brand">Plantinerary</Link>

                        <ul>
                            <li>
                                {/* Can make this do active stuff using NavLink component? I think - its in the docs */}
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