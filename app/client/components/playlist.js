import url from "url";
import qs from "querystring";

import React from "react";
import { autobind } from "core-decorators";

const closeButtonStyle = {
  position: "absolute",
  top: 5,
  right: 5,
  color: "white",
  backgroundColor: "black",
  fontSize: 25,
  padding: "5px 10px",
  cursor: "pointer",
};

const ClickableVideo = ({videoId, onClick, onClose}) =>
  <div style={{position: "relative"}}>
  <div style={{maxWidth: 200, maxHeight: 150, cursor: "pointer"}}>
    <h3 onClick={() => onClick(videoId)}>{videoId}</h3>
  </div>
    <span style={closeButtonStyle} onClick={(evt) => onClose(evt, videoId)}>×</span>
  </div>



class Modal extends React.Component {
  render() {
    const style = {
      color: "black",
      width: 400,
      backgroundColor: "white",
      position: "absolute",
      top: "85%",
      left: "50%",
      marginLeft: -160,
      border: "1px solid black",
      borderRadius: 10,
      padding: 15,
    };

    const backdropStyle = {
      display: this.props.isOpen ? "block" : "none",
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(50,50,50,0.8)",
    };

    let title;
    if (this.props.title) {
      const style = {
        marginTop: 0,
        borderBottom: "1px solid #ccc",
        marginBottom: 10,
        paddingBottom: 5,
      };
      title = <h2 style={style}>{this.props.title}</h2>;
    }

    const closeButton = (
      <div style={{
        position: "absolute",
        right: 5,
        top: 5,
        fontSize: 20,
        padding: "3px 5px",
        cursor: "pointer",
      }} onClick={this.props.onRequestClose}>
        ×
      </div>
    );

    return (
      <div style={backdropStyle} onClick={this.props.onRequestClose}>
        <div style={style} onClick={this.eatClick}>
          {title}
          {closeButton}
          {this.props.children}
        </div>
      </div>
    );
  }

  eatClick(e) {
    e.stopPropagation();
  }
}


export default class Playlist extends React.Component {
  constructor() {
    super();
    this.state = {
      showingAddVideoModal: false,
      showingAddFilepathModal: false,
    };
  }

  render() {
    return (
      <div style={{flex: "1", overflowY: "scroll"}}>
        {this.props.videoIds.map(this.renderVideoId)}
        <button onClick={this.handleShowAddVideoModalClicked}>Add Video</button>
        <div>
        {this.props.currentFilePath.length === 0 && <button onClick={this.handleShowAddFilepathModalClicked}>Add Filepath</button>}
        </div>
        <div>
          <button onClick={function(){ this.handleSaveTimes(); this.handleSavePlaylist(); this.handleSavePath();}.bind(this)}>Save</button>
          <button onClick={function(){ this.handleLoadTimes(); this.handleLoadPlaylist(); this.handleLoadPath();}.bind(this)}>Load</button>
        </div>
        <Modal isOpen={this.state.showingAddVideoModal}
               onRequestClose={this.handleCloseAddVideoModal}
               title="Add Video to Playlist">
          <input type="file" ref="videoId" multiple/>
          <button onClick={this.handleAddVideoClicked}>Add Video</button>
        </Modal>
        <Modal isOpen={this.state.showingAddFilepathModal}
               onRequestClose={this.handleCloseAddFilepathModal}
               title="Add File Path to Playlist">
          <input type="text" ref="filePath" />
          <button onClick={this.handleAddFilepathClicked}>Add Filepath</button>
        </Modal>
      </div>
    );
  }

  @autobind
  renderVideoId(videoId) {
    return <ClickableVideo key={videoId} videoId={videoId}
            onClick={this.handleVideoClicked}
            onClose={this.handleVideoCloseClicked} />
  }

  @autobind
  handleShowAddVideoModalClicked() {
    this.setState({ showingAddVideoModal: true });
  }

  @autobind
  handleShowAddFilepathModalClicked() {
    this.setState({ showingAddFilepathModal: true });
  }

  @autobind
  handleCloseAddVideoModal() {
    this.setState({ showingAddVideoModal: false });
  }

  @autobind
  handleCloseAddFilepathModal() {
    this.setState({ showingAddFilepathModal: false });
  }

  @autobind
  handleVideoClicked(videoId) {
    this.props.onSelectVideo(videoId);

  }

  @autobind
  handleVideoCloseClicked(evt, videoId) {
    evt.stopPropagation();
    this.props.onRemoveVideo(videoId);
  }

  @autobind
  handleAddVideoClicked() {
      for (var i = 0; i < this.refs.videoId.files.length; i++) {
        this.props.onAddVideo(this.refs.videoId.files[i].name.replace(/C:\\fakepath\\/i, ''));
      }
  }

  @autobind
  handleAddFilepathClicked() {
      this.props.onAddFilepath(this.refs.filePath.value);
      this.refs.filePath.value = "";
  }

  @autobind
  handleRemoveVideo(videoId) {
    this.props.onRemoveVideo(videoId);
  }

  @autobind
  handleSaveTimes() {
    require("remote").require("./browser/times").saveTimes(
      this.props.videoTimes
    );
    console.log("saving video times");
  }

  @autobind
  handleSavePlaylist() {
    require("remote").require("./browser/playlist").savePlaylist(
      this.props.videoIds
    );
    console.log("saving video IDs");
  }

  @autobind
  handleSavePath() {
    require("remote").require("./browser/path").savePath(
      this.props.currentFilePath
    );
    console.log("saving file path.");
  }

  @autobind
  handleLoadTimes() {
    require("remote").require("./browser/times").loadTimes(videoTimes => {
      console.log("loading video times", videoTimes);
      this.props.setPlaylistTimes(videoTimes);
    });
  }

  @autobind
  handleLoadPlaylist() {
    require("remote").require("./browser/playlist").loadPlaylist(videoIds => {
      console.log("loading video IDs", videoIds);
      this.props.setPlaylistVideos(videoIds);
    });
  }

  @autobind
  handleLoadPath() {
    require("remote").require("./browser/path").loadPath(currentFilePath => {
      console.log("loading file path", currentFilePath);
      this.props.setFilePath(currentFilePath);
    });
  }
}

Playlist.propTypes = {
  videoIds: React.PropTypes.arrayOf(
    React.PropTypes.string
  ).isRequired,
  onSelectVideo: React.PropTypes.func.isRequired, // fn(videoId)
  onAddVideo: React.PropTypes.func.isRequired, // fn(videoId)
  onRemoveVideo: React.PropTypes.func.isRequired, // fn(videoId)
  setPlaylistVideos: React.PropTypes.func.isRequired, // fn([videoId])
};
