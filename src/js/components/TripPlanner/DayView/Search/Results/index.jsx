import React from 'react';

class Results extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const resultCardEls = this.props.results.map(result =>
            <div className="card" key={result.stop_id}>
                <div className="card-body">
                    <h5 className="card-title">{result.name}</h5>
                    <p className="card-text">{result.summary}</p>
                </div>
                <div className="card-footer">
                    <small className="text-muted">{result.location.address}</small>
                    <button type="button" onClick={() => this.props.selectEvent(result)}>Select</button>
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