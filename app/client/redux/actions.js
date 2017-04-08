function actionCreator(type, ...argNames) {
  return (...args) => {
    const action = argNames.reduce((acc, argName, idx) => {
      acc[argName] = args[idx];
      return acc;
    }, { type: type });
    return action;
  };
}

export const selectVideo = actionCreator("SELECT_VIDEO", "videoId");
export const selectNextVideo = actionCreator("SELECT_NEXT_VIDEO");
export const setVolume = actionCreator("SET_VOLUME", "volume");
//export const updateCurrentTime = actionCreator("UPDATE_CURRENT_TIME", "newTime");
export const updateTime = actionCreator("UPDATE_TIME", "time");
export const updatePlaybackStatus = actionCreator("UPDATE_PLAYBACK_STATUS", "status");
export const updateVideoDuration = actionCreator("UPDATE_VIDEO_DURATION", "videoId", "duration");
export const addVideoToPlaylist = actionCreator("ADD_VIDEO", "videoId");
export const addFilepathToPlaylist = actionCreator("ADD_FILEPATH", "filePath");
export const removeVideoFromPlaylist = actionCreator("REMOVE_VIDEO", "videoId");
export const setPlaylistVideos = actionCreator("SET_PLAYLIST_VIDEOS", "videoIds");
export const setPlaylistTimes = actionCreator("SET_PLAYLIST_TIMES", "videoTimes");
export const setFilePath = actionCreator("SET_FILE_PATH", "currentFilePath");
