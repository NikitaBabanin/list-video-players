const btnBox = document.querySelector(".btnBox");
createPlayer();

const videoList = [
  {
    type: "video/mp4",
    src: "http://vjs.zencdn.net/v/oceans.mp4",
    poster: "../poster2.jpg",
  },
  {
    type: "video/mp4",
    src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    poster: "../poster3.jpg",
  },
  {
    type: "video/mp4",
    src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    poster: "../poster3.png",
  },
  {
    type: "video/mp4",
    src: "http://static.innovid.com/media/encoded/06_17/77511/11_source_35055_110679.mp4",
    poster: "../poster.png",
  },
];
let count = 0;

function controlsList() {
  return `
    <div class="plyr__controls">
        <button type="button" class="plyr__control" data-plyr="restart">
        <svg role="presentation"><use xlink:href="#plyr-restart"></use></svg>
        <span class="plyr__tooltip" role="tooltip">Restart</span>
        </button>
        <button type="button" class="plyr__control" data-plyr="rewind">
        <svg role="presentation"><use xlink:href="#plyr-rewind"></use></svg>
        <span class="plyr__tooltip" role="tooltip">Rewind {seektime} secs</span>
        </button>
         <button type="button" class="custom-btn-play">
        <span>play</span>
        </button> 
        <button type="button" class="plyr__control" data-plyr="fast-forward">
        <svg role="presentation"><use xlink:href="#plyr-fast-forward"></use></svg>
        <span class="plyr__tooltip" role="tooltip">Forward {seektime} secs</span>
        </button>
        <div class="plyr__progress">
        <input data-plyr="seek" type="range" min="0" max="100" step="0.01" value="0" aria-label="Seek">
        <progress class="plyr__progress__buffer" min="0" max="100" value="0">% buffered</progress>
        <span role="tooltip" class="plyr__tooltip">00:00</span>
        </div>
        <div class="plyr__time plyr__time--current" aria-label="Current time">00:00</div>
        <div class="plyr__time plyr__time--duration" aria-label="Duration">00:00</div>
        <button type="button" class="plyr__control" aria-label="Mute" data-plyr="mute">
        <svg class="icon--pressed" role="presentation"><use xlink:href="#plyr-muted"></use></svg>
        <svg class="icon--not-pressed" role="presentation"><use xlink:href="#plyr-volume"></use></svg>
        <span class="label--pressed plyr__tooltip" role="tooltip">Unmute</span>
        <span class="label--not-pressed plyr__tooltip" role="tooltip">Mute</span>
        </button>
        <div class="plyr__volume">
        <input data-plyr="volume" type="range" min="0" max="1" step="0.05" value="1" autocomplete="off" aria-label="Volume">
        </div>
        <button type="button" class="plyr__control" data-plyr="captions">
        <svg class="icon--pressed" role="presentation"><use xlink:href="#plyr-captions-on"></use></svg>
        <svg class="icon--not-pressed" role="presentation"><use xlink:href="#plyr-captions-off"></use></svg>
        <span class="label--pressed plyr__tooltip" role="tooltip">Disable captions</span>
        <span class="label--not-pressed plyr__tooltip" role="tooltip">Enable captions</span>
        </button>
        <button type="button" class="plyr__control" data-plyr="fullscreen">
        <svg class="icon--pressed" role="presentation"><use xlink:href="#plyr-exit-fullscreen"></use></svg>
        <svg class="icon--not-pressed" role="presentation"><use xlink:href="#plyr-enter-fullscreen"></use></svg>
        <span class="label--pressed plyr__tooltip" role="tooltip">Exit fullscreen</span>
        <span class="label--not-pressed plyr__tooltip" role="tooltip">Enter fullscreen</span>
        </button>
        </div> 
    `;
}

function createPlayer() {
  const player = new Plyr("#player", {
    title: "Sigma player",
    // controls: [
    //   "play-large",
    //   "play",
    //   "progress",
    //     "current-time",
    //     "mute",
    //     "volume",
    //     "captions",
    //     "settings",
    //     "pip",
    //     "airplay",
    // ],
    controls: controlsList(),
  });

  createAdditionalElements(player);

  player.on("play", () => console.log("Player started"));
  player.on("stop", () => console.log("Player stopped"));

  document.querySelector(".custom-btn-play").onclick = () => {
    player.togglePlay();
  };
}

function createAdditionalElements(player) {
  //custom button
  createCustomButton("play", "custom-btn", "onclick", () => {
    player.play();
  });
  createCustomButton("pause", "custom-btn", "onclick", () => {
    player.pause();
  });
  createCustomButton("stop", "custom-btn", "onclick", () => {
    player.stop();
  });
  createCustomButton("get data", "custom-btn", "onclick", () => {
    console.log(player);

    alert(`
    Data:
    URL: ${player.source}
    current time: ${Math.floor(player.currentTime)}
    volume: ${player.volume}`);
  });
  createCustomButton("next", "custom-btn", "onclick", () => nextVideo(player));
}

function nextVideo(player) {
  count++;
  if (count === videoList.length) count = 0;
  const video = videoList[count];
  player.source = {
    type: "video",
    title: "Example title",
    sources: [
      {
        src: video.src,
        type: video.type,
        size: 720,
      },
    ],
    poster: video.poster,
  };
}

function createCustomButton(text, clas, event, collbackEvent) {
  const btn = document.createElement("button");
  btn.innerHTML = text;
  btn[event] = collbackEvent;
  btnBox.appendChild(btn);
}
