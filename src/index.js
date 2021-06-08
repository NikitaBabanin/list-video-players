const btnBox = document.querySelector(".btnBox");
createPlayer();

const videoList = [
  {
    type: "video/mp4",
    src: "http://vjs.zencdn.net/v/oceans.mp4",
    poster: "../poster2.jpeg",
  },
  {
    type: "video/mp4",
    src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    poster: "../poster.jpg",
  },
  {
    type: "video/mp4",
    src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    poster: "../poster.png",
  },
  {
    type: "video/mp4",
    src: "http://static.innovid.com/media/encoded/06_17/77511/11_source_35055_110679.mp4",
    poster: "../poster.jpg",
  },
];
let count = 0;

function createPlayer() {
  let player = new Player({
    id: "mse",
    url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    poster: "../poster.jpg",
    download: true,
    pip: true,
    cssFullscreen: true,
    screenShot: true,
    progressDot: [{ time: 10 }, { time: 22 }, { time: 126 }],
    thumbnail: {
      pic_num: 44,
      width: 160,
      height: 90,
      col: 10,
      row: 10,
      urls: [
        "./xgplayer-demo-thumbnail-1.jpg",
        "./xgplayer-demo-thumbnail-2.jpg",
      ],
    },
    customConfig: {
      //
    },
  });

  player.once("ready", () => {
    console.log("ready");
  });
  player.once("play", () => {
    setTimeout(() => player.emit("fiveSecPassed"), 5000);
  });
  player.on("fiveSecPassed", () => {
    console.log("Прошло 5 секунд");
  });

  createAdditionalElements(player);
}

function createAdditionalElements(player) {
  //custom button
  createCustomButton("play", "custom-btn", "onclick", () => {
    player.play();
  });
  createCustomButton("pause", "custom-btn", "onclick", () => {
    player.pause();
  });
  createCustomButton("next", "custom-btn", "onclick", () => {
    count++;
    if (count === videoList.length) count = 0;
    let video = videoList[count];
    player.src = video.src;
    player.poster = video.poster;
  });
}

function createCustomButton(text, clas, event, collbackEvent) {
  const btn = document.createElement("button");
  btn.innerHTML = text;
  btn[event] = collbackEvent;
  btnBox.appendChild(btn);
}
