/**
 * Created with IntelliJ IDEA.
 *
 * @author: jefferson.souza
 * @dateCreated: 13/05/16
 */
import React from 'react';
import Axios from 'axios';

class AppContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.randomTrack();
    }

    randomTrack() {
        let _this = this;

        Axios.get(`https://api.soundcloud.com/playlists/209262931?client_id=${this.client_id}`)
    }

    render() {
        return (
            <div className='my_music'>
            </div>
        );
    }
}

export default AppContainer;