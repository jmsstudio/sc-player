/**
 * Created with IntelliJ IDEA.
 *
 * @author: jefferson.souza
 * @dateCreated: 13/05/16
 */
import React from 'react';
import Axios from 'axios';
import Sound from 'react-sound';

import Search from '../components/search.component.js';
import Details from '../components/details.component.js';
import Player from '../components/player.component.js';
import Progress from '../components/progress.component.js';
import Footer from '../components/footer.component.js';

class AppContainer extends React.Component {
    constructor(props) {
        super(props);

        this.client_id = 'CLIENT_ID';

        this.state = {
            track: {
                stream_url: '',
                title: '',
                artwork_url: ''
            },
            playStatus: Sound.status.STOPPED,
            elapsed: '00:00',
            total: '00:00',
            position: 0,
            playFromPosition: 0,

            autoCompleteValue: '',
            tracks: []
        };
    }

    componentDidMount() {
        this.randomTrack();
    }

    randomTrack() {
        let _this = this;

        Axios.get(`https://api.soundcloud.com/playlists/209262931?client_id=${this.client_id}`)
            .then((resp) => {
                const trackLength = resp.data.tracks.length;

                const randomNumber = Math.floor((Math.random() * trackLength) + 1);

                _this.setState({track: resp.data.tracks[randomNumber]});
            })
            .catch((err) => {
                console.log(err);
            });
    }

    prepareUrl(url) {
        return `${url}?cliend_id=${this.client_id}`;
    }

    formatMilliseconds(milliseconds) {
        const HOUR_MILLISECONDS = 3600000;
        const MINUTE_MILLISECONDS = 60000;
        const SECOND_MILLISECONDS = 1000;

        milliseconds = milliseconds % HOUR_MILLISECONDS;

        const minutes = Math.floor(milliseconds / MINUTE_MILLISECONDS);
        milliseconds = milliseconds % MINUTE_MILLISECONDS;

        const seconds = Math.floor(milliseconds / SECOND_MILLISECONDS);

        return `${(minutes < 10 ? '0' : '')}${minutes}:${(seconds < 10 ? '0' : '')}${seconds}`;
    }

    handleSongPlaying(audio) {
        this.setState({
            elapsed: this.formatMilliseconds(audio.position),
            total: this.formatMilliseconds(audio.duration),
            position: audio.position / audio.duration
        });
    }

    handleSongFinished() {
        this.randomTrack();
    }

    handleSelect(value, item) {
        this.setState({
            autoCompleteValue: value,
            track: item
        });
    }

    handleChange(event, value) {
        this.setState({autoCompleteValue: event.target.value});
        let _this = this;

        Axios.get(`https://api.soundcloud.com/tracks?client_id=${this.client_id}&q=${value}`)
            .then((resp) => {
                _this.setState({tracks: resp.data});
            })
            .catch((err) => {
                console.log(err);
            });
    }

    togglePlay() {
        if (this.state.playStatus == Sound.status.PLAYING) {
            this.setState({playStatus: Sound.status.STOPPED});
        } else {
            this.setState({playStatus: Sound.status.PLAYING});
        }
    }

    stop() {
        this.setState({playStatus: Sound.status.STOPPED});
    }

    forward() {
        this.setState({playFromPosition: this.state.playFromPosition + this.getTenSecsInMillis()});
    }

    backward() {
        this.setState({playFromPosition: this.state.playFromPosition - this.getTenSecsInMillis()});
    }

    xlArtwork(url) {
        let xlArtwork = '';
        if (url) {
            xlArtwork = url.replace(/large/, 't500x500');
        }
        return xlArtwork;
    }

    getTenSecsInMillis() {
        return 10000;
    }

    render() {
        const style = {
            width: '500px',
            height: '500px',
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
                                url(${this.xlArtwork(this.state.track.artwork_url)})`
        };


        return (
            <div className='my_music' style={style}>
                <Search
                    autoCompleteValue={this.state.autoCompleteValue}
                    tracks={this.state.tracks}
                    handleSelect={this.handleSelect.bind(this)}
                    handleChange={this.handleChange.bind(this)}
                />
                <Details title={this.state.track.title}/>
                <Sound
                    url={this.prepareUrl(this.state.track.stream_url)}
                    playStatus={this.state.playStatus}
                    onPlaying={this.handleSongPlaying.bind(this)}
                    playFromPosition={this.state.playFromPosition}
                    onFinishedPlaying={this.handleSongFinished.bind(this)}
                />
                <Player
                    togglePlay={this.togglePlay.bind(this)}
                    stop={this.stop.bind(this)}
                    playStatus={this.state.playStatus}
                    forward={this.forward.bind(this)}
                    backward={this.backward.bind(this)}
                    random={this.randomTrack.bind(this)}
                    />
                <Progress
                    elapsed={this.state.elapsed}
                    total={this.state.total}
                    position={this.state.position}
                />
                <Footer />
            </div>
        );
    }
}

export default AppContainer;