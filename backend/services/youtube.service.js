import axios from "axios";

export default {
  getVideosFromPlaylist: async ({
    playListId = "PLWprcNCq6kTVk4nA01olVuQEO7ZCer5xQ",
  }) => {
    const requestObject = new URLSearchParams({
      part: "snippet",
      playlistId: playListId,
      key: process.env.YOUTUBE_API_KEY,
      maxResults: 15,
    }).toString();

    return axios
      .get(
        `https://www.googleapis.com/youtube/v3/playlistItems?${requestObject}`
      )
      .then((res) => res.data);
  },
  getVideoById: async ({ videoId }) => {
    const requestObject = new URLSearchParams({
      part: "snippet",
      id: videoId,
      key: process.env.YOUTUBE_API_KEY,
    }).toString();

    return axios
      .get(`https://www.googleapis.com/youtube/v3/videos?${requestObject}`)
      .then((res) => res.data);
  },
};
