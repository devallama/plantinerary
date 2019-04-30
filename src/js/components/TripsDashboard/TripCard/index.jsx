import React from 'react';
import { Link } from 'react-router-dom';

class TripCard extends React.Component {
    render() {
        return (
            <div className="col-md-4 mb-2">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">{this.props.name}</h5>
                        {this.props.description &&
                            <p className="card-text">{this.props.description}</p>
                        }
                    </div>
                    <ul className="list-group list-group-flush text-center">
                        <li className="list-group-item">
                            <Link to={`/planner?trip-id=${this.props.id}`} className="btn btn-primary w-50">Go to trip</Link>
                        </li>
                        <li className="list-group-item">
                            <button type="button" className="btn btn-danger w-50" data-toggle="modal" data-target={`#deleteModal${this.props.id}`}>Delete trip</button>
                        </li>
                    </ul>
                    {this.props.type &&
                        <div className="card-footer">
                            <small className="text-muted"><strong>Trip type:</strong> {this.props.type}</small>
                        </div>
                    }
                </div>

                {/* Confirm delete modal */}
                <div className="modal fade" id={`deleteModal${this.props.id}`} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Delete trip</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                Are you sure you want to delete trip '{this.props.name}'?
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={this.props.deleteMethod}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default TripCard;