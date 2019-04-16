import React from 'react';

class Page extends React.Component {
    constructor(props) {
        super(props);

        document.title = `${this.props.title} | Plan-tinerary`;
    }

    render() {
        const PageComponent = this.props.component;

        return (
            <PageComponent />
        );
    }
}

export default Page;