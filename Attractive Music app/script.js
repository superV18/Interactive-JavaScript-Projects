console.log("welcome to javascript");

let songIndex = 0;
let audioElement = new Audio("songs/1.mp3");
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let masterSongName = document.getElementById("masterSongName");
let playGif = document.getElementById("playingGif");
let playingGifsmall = document.getElementsByClassName("playingGif1");
document.getElementById('mymarquee').stop();

let songs = [
  {
    songName: "let me love you - Justin Beiber",
    filePath: "songs/1.mp3",
    coverPath: "covers/1.jpg",
  },
  {
    songName: "Everything for you - Justin Beiber",
    filePath: "songs/2.mp3",
    coverPath: "covers/2.jpg",
  },
  {
    songName: "You are My World! - Justin Beiber",
    filePath: "songs/3.mp3",
    coverPath: "covers/3.jpg",
  },
  {
    songName: "Baby.. Baby... O Yeah! - Justin Beiber",
    filePath: "songs/4.mp3",
    coverPath: "covers/4.jpg",
  },
  {
    songName: "Hearty vibes - Justin Beiber",
    filePath: "songs/5.mp3",
    coverPath: "covers/5.jpg",
  },
];

masterPlay.addEventListener("click", () => {
  let currentSong = document.getElementById(`${songIndex}`);
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
    currentSong.classList.remove("fa-circle-play");
    currentSong.classList.add("fa-circle-pause");
    document.getElementById(`gif${songIndex}`).style.opacity=1;
    document.getElementById('mymarquee').start();
    
    playGif.style.opacity = 1;
  } else {
    audioElement.pause();
    masterPlay.classList.add("fa-circle-play");
    masterPlay.classList.remove("fa-circle-pause");
    playGif.style.opacity = 0;
    document.getElementById(`gif${songIndex}`).style.opacity=0;
    document.getElementById('mymarquee').stop();
    currentSong.classList.add("fa-circle-play");
    currentSong.classList.remove("fa-circle-pause");
  }
});

audioElement.addEventListener("timeupdate", () => {
  Progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  myProgressBar.value = Progress;
});

myProgressBar.addEventListener("change", () => {
  audioElement.currentTime =
    (myProgressBar.value * audioElement.duration) / 100;
});

const makeAllplays = () => {
  // to reset to play icons for all songs
  Array.from(document.getElementsByClassName("songItemPlay")).forEach(
    (element) => {
      element.classList.remove("fa-circle-pause");
      element.classList.add("fa-circle-play");
      Array.from(playingGifsmall).forEach((gif) => {
        gif.style.opacity = 0;
      });   

    }
  );
};

Array.from(document.getElementsByClassName("songItemPlay")).forEach(
  (element) => {
    element.addEventListener("click", (e) => {
      songIndex = parseInt(e.target.id);
      if (Array.from(e.target.classList).indexOf("fa-circle-play") !== -1) {
        makeAllplays();
        e.target.classList.remove("fa-circle-play");
        e.target.classList.add("fa-circle-pause");
        audioElement.src = `songs/${songIndex + 1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        playGif.style.opacity = 1;
        document.getElementById('mymarquee').start();
        document.getElementById(`gif${songIndex}`).style.opacity=1;
        masterPlay.classList.remove("fa-circle-play");
        masterPlay.classList.add("fa-circle-pause");
      } else {
        makeAllplays();
        e.target.classList.remove("fa-circle-pause");
        e.target.classList.add("fa-circle-play");
        audioElement.pause();
        playGif.style.opacity = 0;
        document.getElementById('mymarquee').stop();

        document.getElementById(`gif${songIndex}`).style.opacity=0;
        masterPlay.classList.remove("fa-circle-pause");
        masterPlay.classList.add("fa-circle-play");
      }
    });
  }
);

document.getElementById("next").addEventListener("click", () => {
  if (songIndex >= 4) {
    songIndex = 0;
  } else {
    songIndex += 1;
  }
  let currentSong = document.getElementById(`${songIndex}`);
  audioElement.src = `songs/${songIndex + 1}.mp3`;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove("fa-circle-play");
  masterPlay.classList.add("fa-circle-pause");
  makeAllplays();
  playGif.style.opacity = 1;
  document.getElementById(`gif${songIndex}`).style.opacity=1;
  currentSong.classList.remove("fa-circle-play");
  currentSong.classList.add("fa-circle-pause");
});
document.getElementById("previous").addEventListener("click", () => {
  if (songIndex <= 0) {
    songIndex = 4;
  } else {
    songIndex -= 1;
  }
  let currentSong = document.getElementById(`${songIndex}`);
  audioElement.src = `songs/${songIndex + 1}.mp3`;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove("fa-circle-play");
  masterPlay.classList.add("fa-circle-pause");
  makeAllplays();
  playGif.style.opacity = 1;

  document.getElementById(`gif${songIndex}`).style.opacity=1;
  currentSong.classList.remove("fa-circle-play");
  currentSong.classList.add("fa-circle-pause");
});
