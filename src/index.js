createPlayer();

function createPlayer() {
  const dp = new DPlayer({
    container: document.getElementById("dplayer"),
    video: {
      url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    },
  });

  dp.play();
}
