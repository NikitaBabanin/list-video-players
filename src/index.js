createPlayer();

function createPlayer() {
  const dp = new DPlayer({
    container: document.getElementById("dplayer"),
    screenshot: true,
    video: {
      url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      pic: "../pic.jpg",
      thumbnails: "thumbnails.jpg",
    },
    // subtitle: {
    //   url: "webvtt.vtt",
    // },
    // danmaku: {
    //   id: "demo",
    //   api: "https://api.prprpr.me/dplayer/",
    // },
  });
}
