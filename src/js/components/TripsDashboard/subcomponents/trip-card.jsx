import React from 'react';
import { Link } from 'react-router-dom';

class TripCard extends React.Component {
    render() {
        return (
            <div className="col-md-4 mb-2">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">{this.props.name}</h5>
                        <p className="card-text">{this.props.description && this.props.description}</p>
                    </div>
                    <ul className="list-group list-group-flush text-center">
                        <li className="list-group-item">
                            <Link to={`/trip-view?trip-id=${this.props.id}`} className="btn btn-primary w-50">Go to trip</Link>
                        </li>
                        <li className="list-group-item">
                            {/* add on click */}
                            <button type="button" className="btn btn-secondary w-50">Edit trip</button>
                        </li>
                        <li className="list-group-item">
                            {/* add on click */}
                            <button type="button" className="btn btn-danger w-50">Delete trip</button>
                        </li>
                    </ul>
                    <div className="card-footer">
                        <small className="text-muted">{this.props.type && this.props.type}</small>
                    </div>
                </div>
            </div>
        );
    }
}

export default TripCard;