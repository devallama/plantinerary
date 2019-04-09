import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

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

                    <Route path="/" exact component={PageLanding} />
                    <Route path="/login" component={PageLogin} />
                </div>
            </Router>
        )
    }
}

export default App;