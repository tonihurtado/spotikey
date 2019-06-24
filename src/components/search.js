import React, { Component } from 'react';
import './search.css';

class Search extends Component {

  constructor(props) {
      super(props);

      this.state = {
        term: ''
      }

      this.onInputChange = term => {
        this.setState({term});
        this.props.onSearchTermChange(term);

      }
  }

  render() {
    return (
      <div className="container has-text-centered">
        <div className="column is-6 is-offset-3">
          <h1 className="title paddings">
            Spotikey
            <span className="logito icon">
              <i className=" fa fa-spotify"></i>
            </span>
          </h1>
          <p className = "paddings">
              App that gets the audio features of any track using the Spotify API.
            By <a style={{'textDecoration' : 'underline'}} href="https://open.spotify.com/artist/4TF74vDSL1GnY94FtN2sqy?si=sO-1hbdIQf2Eeth7DQs-Aw">texture</a>
          </p>
        <div className="box">

            <div className="field is-grouped">
              <p className="control is-expanded">
                <input
                  className="input" type="text"
                  placeholder="Track name"
                  value = {this.state.term}
                  onChange = { e => this.onInputChange(e.target.value)}
                />
              </p>
              <p className="control">
                <a className="button is-dark">
                  Search key
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Search;
