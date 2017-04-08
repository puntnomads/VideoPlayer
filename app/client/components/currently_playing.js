import React from "react";

export default class CurrentlyPlaying extends React.Component {
  render() {
    return (
      <div style={{maxWidth: 200, maxHeight: 150}}>
        <h3>{this.props.videoId}</h3>
      </div>
    );
  }
}

CurrentlyPlaying.propTypes = {
  videoId: React.PropTypes.string,
};
