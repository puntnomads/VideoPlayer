const savedVolume = parseInt(window.localStorage.getItem('initialVolume'), 10);

const initialState = {
  playlist: [],
  times: [],
  currentVideoId: "",
  currentFilePath: ""
};

export function playlistReducer(state = initialState, action) {
  switch (action.type) {
    case "SELECT_VIDEO":
      return {
        ...state,
        currentVideoId: action.videoId
      };
    case "SELECT_NEXT_VIDEO":
      const thisVideoId = state.currentVideoId;
      const index = state.playlist.indexOf(thisVideoId);
      let nextVideoIndex = index + 1;
      const numVideos = state.playlist.length;
      if (nextVideoIndex > numVideos - 1) {
        nextVideoIndex = 0;
      }
      const nextVideoId = state.playlist[nextVideoIndex];

      return {
        ...state,
        currentVideoId: nextVideoId
      };
    case "SET_VOLUME":
      window.localStorage.setItem('initialVolume', action.volume);
      return {
        ...state,
        volume: action.volume
      };
    case "ADD_VIDEO":
      {
        if (state.playlist.includes(action.videoId)) {
          return state;
        }

        const newVideoId = state.currentVideoId || action.videoId;

        return {
          ...state,
          playlist: state.playlist.concat([action.videoId]),
          currentVideoId: newVideoId
        };
      }
    case "ADD_FILEPATH":
      return {
        ...state,
        currentFilePath: action.filePath
      };
    case "UPDATE_TIME":
    const currentVideoId = state.currentVideoId;
    const currentIndex = state.playlist.indexOf(currentVideoId);
    const Times = state.times;
    Times[currentIndex] = action.time;
    return {
      ...state,
      times : Times
    };
    case "REMOVE_VIDEO":
      const newPlaylist = state.playlist.filter(id => id !== action.videoId)
      let newVideoId = state.currentVideoId;
      if (state.currentVideoId === action.videoId) {
        // Current video is being removed.
        newVideoId = newPlaylist[0];
      }
      const newTimes = state.times.filter(id => id !== state.times[state.playlist.indexOf(action.videoId)])
      return {
        ...state,
        playlist: newPlaylist,
        times : newTimes,
        currentVideoId: newVideoId
      };
    case "SET_PLAYLIST_VIDEOS":
      return {
        ...state,
        playlist: action.videoIds,
        currentVideoId: action.videoIds[0]
      };
      case "SET_PLAYLIST_TIMES":
        return {
          ...state,
          times: action.videoTimes
        };
      case "SET_FILE_PATH":
        return {
          ...state,
          currentFilePath: action.currentFilePath
        };
    default:
      return state;
  }
}

export function playbackStateReducer(state = initialState, action) {
  switch (action.type) {
    case "UPDATE_PLAYBACK_STATUS":
      return {
        ...state,
        playbackStatus: action.status
      };
    case "UPDATE_VIDEO_DURATION":
      return {
        ...state,
        videoDurations: {
          ...state.videoDurations,
          [action.videoId]: action.duration
        }
      };
    default:
      return state;
  }
}
