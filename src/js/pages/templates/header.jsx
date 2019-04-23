import React from 'react';

import { Link } from 'react-router-dom';

class Header extends React.Component {
    render() {
        console.log(this.props);
        if (this.props.user && this.props.user.isLoggedIn) {
            return (
                <div className="topbar">
                    <div className="topbar__logo">
                        Plantinerary
                </div>
                    <div className="topbar__navigation">
                        <nav className="site-nav">
                            <ul className="site-nav__list">
                                <li className="site-nav__item">
                                    <Link to="/dashboard" className="site-nav__link">Dashboard</Link>
                                </li>
                                <li className="site-nav__item">
                                    <Link to="/logout" className="site-nav__link">Logout</Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            );
        } else {
            return (
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
            );
        }
    }
}

export default Header;