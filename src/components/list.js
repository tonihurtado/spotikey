import React, { Component } from 'react';
import Track from './track';

import './list.css';

class List extends Component {

  constructor(props){
    super(props);

  }

  render() {

    var cont = -1;
    const trackItems = this.props.tracks.map((track, index) => {
      cont++;
      return(
        <Track
          key = {track.id}
          track = {track}
          features = {this.props.features[index]}
          mobile= {this.props.mobile}
        />
      )
    });

    return (
      <div className="container has-text-centered">
        <div className="column is-6 is-offset-3">
          {trackItems}
        </div>
      </div>
    );
  }
}

export default List;
