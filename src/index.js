const blockPlyer = document.querySelector(".wrapper");
const selector = document.querySelector(".video-js");
const btnBox = document.querySelector(".video-custom-btn");

createPlayer();

const videoList = [
  {
    type: "video/mp4",
    src: "http://vjs.zencdn.net/v/oceans.mp4",
  },
  {
    type: "video/mp4",
    src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  },
  {
    type: "video/mp4",
    src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  },
  {
    type: "video/mp4",
    src: "http://static.innovid.com/media/encoded/06_17/77511/11_source_35055_110679.mp4",
  },
];

let count = 0;

function createPlayer() {
  let options = {
    controls: true,
    autoplay: false,
    preload: "auto",
  };

  let player = videojs(selector, options, () => {
    console.log("Your player is ready!");
    player.play();
    player.volume(0);
  });

  player.on("ended", () => {
    this.dispose();
  });

  createButton(player, "customClass", `5<<`, "onclick", () => {
    skipS3MV(player, -5);
  });
  createButton(player, "customClass", ">>5", "onclick", () => {
    skipS3MV(player, 5);
  });
  createButton(player, "customClass", `next`, "onclick", () => {
    count++;
    if (count === videoList.length) count = 0;
    player.src(videoList[count]);
    player.play();
    player.volume(0);
  });

  createCustomButton(player, "play", () => {
    player.play();
  });
  createCustomButton(player, "pause", () => {
    player.pause();
  });
  createCustomButton(player, "get data", () => {
    alert(
      `Data: \nVideo URL: ${player.src()}

       Total duration: ${Math.floor(player.duration())}
       Time has passed: ${Math.floor(player.currentTime())}
       Time left over: ${Math.floor(player.remainingTime())}`
    );
  });
}

function createButton(player, clas, text, event, callbackEvent) {
  let btn = player.controlBar.addChild("button");

  var btnDom = btn.el();
  btnDom.innerHTML = text;
  btn.addClass(clas);

  btnDom[event] = callbackEvent;
}

function skipS3MV(player, skipBy) {
  player.currentTime(player.currentTime() + skipBy);
}

function createCustomButton(player, text, callbackEvent) {
  const btn = document.createElement("button");

  btn.innerHTML = text;
  btn.onclick = callbackEvent;

  btnBox.appendChild(btn);
}
