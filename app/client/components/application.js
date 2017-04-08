import React from "react";
import { autobind } from "core-decorators";
import { connect } from "react-redux";

import * as actions from "../redux/actions";

import CurrentlyPlaying from "./currently_playing";
import Playlist from "./playlist";
import VideoPlayer from "./video_player";


@connect(state => ({
  ...state,
}), actions)
export default class Application extends React.Component {
  constructor(props) {
    super(props);
    window.props = props;
    this.state = {
      currentTime: 0
    };
  }

  render() {
    return (
      <div style={{height: "100%", display: "flex", flexDirection: "row"}}>
        <div style={{flex: "1 0 200px", display: "flex", flexDirection: "column"}}>
          <Playlist videoIds={this.props.playlist}
                    videoTimes={this.props.times}
                    currentFilePath={this.props.currentFilePath}
                    onAddVideo={this.props.addVideoToPlaylist}
                    onAddFilepath={this.props.addFilepathToPlaylist}
                    onRemoveVideo={this.props.removeVideoFromPlaylist}
                    onSelectVideo={this.props.selectVideo}
                    setPlaylistVideos={this.props.setPlaylistVideos}
                    setPlaylistTimes={this.props.setPlaylistTimes}
                    setFilePath={this.props.setFilePath}/>
          <CurrentlyPlaying videoId={this.props.currentVideoId} />
        </div>
        <div style={{flexBasis: "100%", display: "flex", flexDirection: "column"}}>
          <VideoPlayer videoId={this.props.currentVideoId}
                       filePath={this.props.currentFilePath}
                       onUpdateTime={this.props.updateTime}
                       time={this.props.times[this.props.playlist.indexOf(this.props.currentVideoId)]} />
        </div>
      </div>
    );
  }


}
