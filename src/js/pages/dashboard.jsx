import React from 'react';

import TripsDashboard from 'Components/TripsDashboard';

class Dashboard extends React.Component {
    render() {
        return (
            <div className="container">
                <TripsDashboard />
            </div>
        );
    }
}

export default Dashboard;