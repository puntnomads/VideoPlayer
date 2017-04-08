import React from "react";
import { findDOMNode } from "react-dom";
import { autobind } from "core-decorators";

export default class VideoPlayer extends React.Component {

  componentDidMount() {
    let vid = this.refs.video;
    vid.addEventListener("loadedmetadata", this.setTime);
    vid.addEventListener("pause", this.getTime);
  }

  componentWillUnmount() {
    vid.removeEventListener("loadedmetadata", this.setTime);
    vid.removeEventListener("pause", this.getTime);
  }

  @autobind
  setTime(){
    this.refs.video.currentTime = this.props.time;
  }

  @autobind
  getTime(){
    console.log(Math.floor(this.refs.video.currentTime));
    let time = Math.floor(this.refs.video.currentTime);
    this.props.onUpdateTime(time);
  }

  render(){
    return (
      <div>
        <video ref="video" width='100%' height='100%' controls src={`file://${this.props.filePath}/${this.props.videoId}`} />
      </div>
    );
  }
}
