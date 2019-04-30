import React from 'react';

import Header from './header';

class Page extends React.Component {
    constructor(props) {
        super(props);

        document.title = `${this.props.title} | Plan-tinerary`;
    }

    render() {
        const PageComponent = this.props.component;

        return (
            <div>
                <Header user={this.props.user} />
                <PageComponent />
            </div>
        );
    }
}

export default Page;