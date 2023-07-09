let songs = [
  {
    name: "We Don't Talk Anymore",
    filePath: "songs/1.mp3",
    singer: "Charlie Puth, Selena Gomez",
    cover:
      "https://p16.resso.me/img/tos-alisg-v-2102/e69a79d0e80c4a10a6c6102c5ce339e5~c5_1000x1000.jpg",
  },
  {
    name: "Señorita",
    filePath: "songs/2.mp3",
    singer: "Shawn Mendes, Camila Cabello",
    cover:
      "https://upload.wikimedia.org/wikipedia/commons/8/8d/Shawn_Mendes_and_Camila_Cabello_-_Se%C3%B1orita.png",
  },
  {
    name: "No Lie",
    filePath: "songs/3.mp3",
    singer: "Sean Paul, Dua Lipa",
    cover: "https://c.saavncdn.com/662/No-Lie-English-2016-500x500.jpg",
  },
  {
    name: "Closer",
    filePath: "songs/4.mp3",
    singer: "The Chainsmokers, Halsey",
    cover: "https://c.saavncdn.com/147/Closer-English-2016-500x500.jpg",
  },
  {
    name: "At My Worst",
    filePath: "songs/5.mp3",
    singer: "Pink Sweat$",
    cover: "https://meteamedia.org/wp-content/uploads/2021/01/at-my-worst.jpg",
  },
  {
    name: "Heat Waves",
    filePath: "songs/6.mp3",
    singer: "Glass Animals",
    cover: "https://i.scdn.co/image/ab67616d00001e02712701c5e263efc8726b1464",
  },
  {
    name: "Despacito - Remix",
    filePath: "songs/7.mp3",
    singer: "Luis Fonsi, Daddy Yankee, Justin Bieber",
    cover:
      "https://c.saavncdn.com/575/Despacito-Remix--English-2017-500x500.jpg",
  },
  {
    name: "Dance Monkey",
    filePath: "songs/8.mp3",
    singer: "Tones And I",
    cover: "https://i.scdn.co/image/ab67616d0000b273c6f7af36ecdc3ed6e0a1f169",
  },
  {
    name: "Rewrite The Stars",
    filePath: "songs/9.mp3",
    singer: "James Arthur, Annie-Marie",
    cover:
      "https://c.saavncdn.com/116/The-Greatest-Showman-Reimagined-English-2018-20190604210109-500x500.jpg",
  },
  {
    name: "Shower",
    filePath: "songs/10.mp3",
    singer: "Becky G",
    cover: "https://c.saavncdn.com/515/Shower-2014-500x500.jpg",
  },
];

const seekBar = document.getElementById("myProgressBar");
let audioElement = new Audio("songs/1.mp3");
const masterPlay = document.getElementById("play-btn");
const forwardBtn = document.getElementById("forward-btn");
const backwardBtn = document.getElementById("backward-btn");
const songItems = Array.from(document.getElementsByClassName("song-item"));
const songInfo = document.querySelector(".song-info-container");
let songIndex = 0;

songItems.forEach((element, index) => {
  element.getElementsByTagName("img")[0].src = songs[index].cover;
  element.getElementsByClassName("song-name")[0].textContent =
    songs[index].name;
});

const updateSeekbar = () => {
  const progress = (audioElement.currentTime / audioElement.duration) * 100;
  seekBar.value = progress.toFixed(2);
};

masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
    updateSeekbar();
  } else {
    audioElement.pause();
    masterPlay.classList.remove("fa-circle-pause");
    masterPlay.classList.add("fa-circle-play");
  }
});

// audioElement.addEventListener("timeupdate", () => {
//   const progress = (audioElement.currentTime / audioElement.duration) * 100;
//   seekBar.value = progress;
// });

// This event will trigger whenever the user changes value of the input field
seekBar.addEventListener("input", (e) => {
  const seekPosition = (seekBar.value / 100) * audioElement.duration;
  audioElement.currentTime = seekPosition;
});

// Forward feature
document.getElementById("forward-btn").addEventListener("click", () => {
  songIndex = (songIndex + 1) % songs.length;
  audioElement.src = `songs/${songIndex + 1}.mp3`;
  audioElement.play();
  masterPlay.classList.remove("fa-circle-play");
  masterPlay.classList.add("fa-circle-pause");
  updateSeekbar();
  changeSongInfo(songIndex + 1);
});

// Backward Feature
document.getElementById("backward-btn").addEventListener("click", () => {
  if (songIndex == 0) {
    songIndex = 0;
  } else {
    songIndex = (songIndex - 1) % songs.length;
  }
  audioElement.src = `songs/${songIndex + 1}.mp3`;
  audioElement.play();
  masterPlay.classList.remove("fa-circle-play");
  masterPlay.classList.add("fa-circle-pause");
  updateSeekbar();
  changeSongInfo(songIndex + 1);
});

function makeAllPlays() {
  Array.from(document.querySelectorAll(".song-duration i")).forEach(
    (element) => {
      element.classList.remove("fa-circle-pause");
      element.classList.add("fa-circle-play");
    }
  );
}

function changeSongInfo(index) {
  songInfo.getElementsByTagName("img")[0].src = songs[index - 1].cover;
  songInfo.getElementsByClassName("song-name")[0].textContent =
    songs[index - 1].name;
  songInfo.getElementsByClassName("song-singer")[0].textContent =
    songs[index - 1].singer;
}

Array.from(document.querySelectorAll(".song-duration i")).forEach((element) => {
  element.addEventListener("click", (e) => {
    makeAllPlays();
    element.classList.remove("fa-circle-play");
    element.classList.add("fa-circle-pause");
    songId = e.target.id;
    songIndex = songId - 1;
    audioElement.src = `songs/${songId}.mp3`;
    audioElement.play();
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
    changeSongInfo(songId);
  });
});

setInterval(() => {
  if (!audioElement.paused) {
    updateSeekbar();
  }
}, 100);
