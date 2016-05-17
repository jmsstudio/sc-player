/**
 * Created by jefferson on 04/05/16.
 */
import React from 'react';
import ReactDOM from 'react-dom';

import AppContainer from './containers/app.container.js';

class App extends React.Component {
    render() {
        return (
            <AppContainer />
        );
    }
}

ReactDOM.render(<App/>, document.getElementById('content'));