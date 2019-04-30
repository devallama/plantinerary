import React from 'react';

class Results extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const resultCardEls = this.props.results.map(result =>
            <div className="card mb-2" key={result.stop_id}>
                <div className="card-body">
                    <div className="row">
                        <div className="col-4">
                            <img src={result.picture.url} className="img-fluid rounded" alt={result.name} />
                        </div>
                        <div className="col-8">
                            <h5 className="card-title">{result.name}</h5>
                            <p className="card-text">{result.summary}</p>
                            <small className="text-muted">{result.location.address}</small>
                        </div>
                    </div>
                </div>
                <div className="card-footer">
                    <button type="button" className="btn btn-primary" onClick={() => this.props.selectEvent(result)}>Add to itinerary</button>
                </div>
            </div>
        );

        return (
            <div className="card-flex">
                {resultCardEls}
            </div>
        );
    }
}

export default Results;