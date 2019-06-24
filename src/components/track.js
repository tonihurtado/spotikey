import React, { Component } from 'react';
import './track.css';

class Track extends Component {
  constructor(props) {
    super(props);

    this.state = {
      track: this.props.track,
      features: this.props.features,
      mobile: this.props.mobile,
    };

    this.getKey = () => {
      if (this.props.features) {
        const keys = [
          'C',
          'C#',
          'D',
          'D#',
          'E',
          'F',
          'F#',
          'G',
          'G#',
          'A',
          'A#',
          'B'
        ];
        return keys[this.props.features.key];
      }
    };

    this.getTempo = () => {
      if (this.props.features) return Math.floor(this.props.features.tempo);
    };

    this.getArtist = () => {
      let artists = '',
        first = true;
      this.props.track.artists.map(artist => {
        if (!first) artists += ' & ';

        artists += artist.name;
        first = false;
      });

      return artists;
    };
  }

  render() {
    return (
      <div className="card">
        <a href={this.props.track.external_urls.spotify}>
          <div className="box content">
            <article className="post">
              <h4>{this.props.track.artists[0].name + " - " + this.props.track.name}</h4>
              <div className="level media is-inline-touch">
                <div className="level-left media-left is-inline-touch">
                  <div className="content madafaka">
                    <div>
                      <iframe
                        src={
                          'https://open.spotify.com/embed?uri=' +
                          this.props.track.uri
                        }
                        width="100%"
                        height="90"
                        frameBorder="0"

                        allow="encrypted-media"
                      />
                    </div>
                  </div>
                </div>
                <div className="level-right media-content is-inline-touch">
                  <div className="content">
                    <ul>
                      <span className="tag">
                        Key: <h4 className="feature">{this.getKey()}</h4>
                      </span>
                      <span className="tag">
                        BPM: <h4 className="feature">{this.getTempo()}</h4>
                      </span>
                    </ul>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </a>
      </div>
    );
  }
}

export default Track;
