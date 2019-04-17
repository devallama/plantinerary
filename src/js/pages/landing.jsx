import React from 'react';
import { Link } from 'react-router-dom';

class Landing extends React.Component {
    render() {
        return (
            <section className="section section--landing">
                <div className="container col-md-6 col-lg-5 col-xl-4">
                    <h1 className="display-3">Plantinerary</h1>
                    <h2>Plan your next adventure.</h2>
                    <p>
                        Use Plantinerary to find events, tours, restraunts, and more in your next vaction location and add them
                        to your daily itinerary planner.
                    </p>
                    <p>
                        Your next adventure in one place.
                    </p>
                    <div className="mt-5 mb-4">
                        <Link to="/login" className="mr-4"><button className="btn btn-primary">Login</button></Link>
                        <Link to="/register" className="mr-4"><button className="btn btn-secondary">Register</button></Link>
                    </div>
                    <a href="/dashboard" className="link link--arrow">Continue without logging in</a>
                </div>
            </section>
        );
    }
}

export default Landing;