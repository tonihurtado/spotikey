import React, { Component } from 'react';
import _ from 'lodash';
import request from 'request';
import Spotify from 'spotify-web-api-node';

import './App.css';
import Search from './components/search';
import List from './components/list';
//
 require('dotenv').config();

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      term: '',
      mobile: true,
      token: '',
      tracks: [],
      features: []
    };

    this.searchTrack = term => {
      this.setState({ term });

      const spotifyApi = new Spotify();
      const CORSproxy = 'https://cors-anywhere.herokuapp.com/';

      var authOptions = {
        url: CORSproxy + 'https://accounts.spotify.com/api/token',
        headers: {
          Authorization:
            'Basic ' +
            new Buffer(
              process.env.REACT_APP_PUBLIC_KEY +
                ':' +
                process.env.REACT_APP_PRIVATE_KEY
            ).toString('base64'),
          value: 'application/x-www-form-urlencoded'
        },
        form: {
          grant_type: 'client_credentials'
        },
        json: true
      };

      var that = this;

      request.post(authOptions, function(error, response, body) {
        if (!error && response.statusCode === 200) {
          that.setState({ token: body.access_token });

          spotifyApi.setAccessToken(that.state.token);

          spotifyApi.searchTracks(that.state.term).then(
            function(data) {
              that.setState({ tracks: [...data.body.tracks.items] });

              var ids = new Array();
              that.state.tracks.forEach(track => {
                ids.push(track.id);
              });

              spotifyApi.getAudioFeaturesForTracks(ids).then(function(data) {
                that.setState({ features: [...data.body.audio_features] });

                console.log(data.body);
              });
            },
            function(err) {
              console.error(err);
            }
          );
        }
      });
    };
  }

  render() {
    const searchTrack = _.debounce(term => {
      this.searchTrack(term);
    }, 500);

    const component1 = <Search onSearchTermChange={searchTrack} />;
    let component2;

    if (!this.state.tracks[1]) component2 = <div />;
    else
      component2 = (
        <List mobile={this.state.mobile} tracks={this.state.tracks} features={this.state.features} />
      );

    return (
      <div className="App">
        {component1}
        {component2}
      </div>
    );
  }
}

export default App;
