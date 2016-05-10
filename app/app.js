/**
 * Created by jefferson on 04/05/16.
 */
import React from 'react';
import ReactDOM from 'react-dom';

import Search from './components/search.component.js';
import Details from './components/details.component.js';
import Player from './components/player.component.js';
import Progress from './components/progress.component.js';
import Footer from './components/footer.component.js';

class App extends React.Component {
    render() {
        return (
            <div>
                <Search />

                <Details title={'Track title'}/>

                <Player/>

                <Progress position={'0.3'}
                          elapsed={'00:00'}
                          total={'0:40'} />

                <Footer/>
            </div>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById('content'));