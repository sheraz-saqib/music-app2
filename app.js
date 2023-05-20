// All req clases
const songCollection = [
  {
    name: "kahani sono 2.0 ",
    img: "1",
    audio: new Audio("./song/1.mp3"),
  },
  {
    name: "Agency talha-anjum ",
    img: "2",
    audio: new Audio("./song/2.mp3"),
  },
  {
    name: "Kana yari",
    img: "3",
    audio: new Audio("./song/3.mp3"),
  },
  {
    name: "Gumman Talha Anjum",
    img: "4",
    audio: new Audio("./song/4.mp3"),
  },
  {
    name: "Jéja - Bad Habit (ft. Zaug) - Phonk Version  ",
    img: "5",
    audio: new Audio("./song/5.mp3"),
  },
  {
    name: "PHI NIX - Can't Break Me Down  ",
    img: "6",
    audio: new Audio("./song/6.mp3"),
  },
  {
    name: "MADZI - Let's Play  ",
    img: "7",
    audio: new Audio("./song/7.mp3"),
  },
  {
    name: "OMAS & Awon - The Rage (feat. Micah Martin)  ",
    img: "8",
    audio: new Audio("./song/8.mp3"),
  },
  {
    name: "ATSMXN, XTOM - The Raven  ",
    img: "9",
    audio: new Audio("./song/9.mp3"),
  },
];
const songImg = document.querySelector(".imgArea img"),
  container = document.querySelector(".container"),
  songplayIndex = document.querySelector(".songplayIndex"),
  song_name = document.querySelector(".song_name p "),
  progressBarArea = document.querySelector(".progressBarArea"),
  progreeLine = document.querySelector(".progreeLine"),
  durationCont = document.querySelector(".duration"),
  currentTimeCont = document.querySelector(".currentTime"),
  repeatIcon = document.querySelector(".bx-repeat"),
  previousIcon = document.querySelector(".bx-skip-previous"),
  playIcon = document.querySelector(".bx-play"),
  pauseIcon = document.querySelector(".bx-pause"),
  nextIcon = document.querySelector(".bx-skip-next"),
  download_li = document.querySelector(".download_li"),
  downloadBtn = document.querySelector("#downlaod"),
  volume_control = document.querySelector(".volume_control"),
  volume_bar = document.querySelector(".volume_bar"),
  speakerIconDiv = document.querySelector(".speakerIcon"),
  speakerIcon = document.querySelector(".speakerIcon i"),
  toggle_icon_li = document.querySelector(".toggle-icon"),
  heart_li = document.querySelector(".heart_li"),
  control = document.querySelector(".control ul"),
  totalSong = document.querySelector(".totalSong"),
  heartIcon = document.querySelector(".bx-heart");
let songIndex = 0;
let song = songCollection[songIndex].audio;
let songNextPlay = true;
let volTotalWidth  =''
let volClickWidth =''
let volFinalPercent =''
let songVol  = ''
let scale = 1;
let wheelFuntion = false;
document.addEventListener('keydown',(e)=>{
  let Key  = e.key
  
  if(Key == 'p' ){
   playIcon.click()
  }
  else if(Key == 'k'){
    pauseIcon.click()
  }
  else if(Key == 'l'){
    timeUpdate()
    song.currentTime+=10;
  }
  else if(Key == 'j'){
    timeUpdate()
    song.currentTime-=10;
  }
  else if(Key == 'm'){
    nextIcon.click()
  }
  else if(Key == 'n'){
    previousIcon.click()
  }
  else if(Key == 'd'){
    downloadBtn.click()
  }
  })
function playSong() {
  song = songCollection[songIndex].audio;
  timeUpdate();
  song.play();
  songImg.src = `./covers/${songIndex + 1}.jpg`;
  songplayIndex.textContent = songIndex + 1;
  song_name.textContent = songCollection[songIndex].name;
  toggle_icon_li.classList.add("play_animation");
  container.classList.add("color_change");
  control.style.backgroundColor = "rgb(221, 221, 221)";
  // volume_control.style.backgroundColor = 'white'
}

function pauseSong() {
  song = songCollection[songIndex].audio;
  song.pause();
  toggle_icon_li.classList.remove("play_animation");
  container.classList.remove("color_change");
  control.style.backgroundColor = "rgba(233, 233, 233, 0.37)";
}

playIcon.onclick = () => {
  playIcon.style.display = "none";
  pauseIcon.style.display = "block";
  playSong();
  // playSong= true;
};
pauseIcon.onclick = () => {
  playIcon.style.display = "block";
  pauseIcon.style.display = "none";
  pauseSong();
  // playSong= false;
};

function findCrrTime() {
  let mint = Math.floor(song.currentTime / 60);
  let sec = Math.floor(song.currentTime % 60);
  if (sec < 10) {
    currentTimeCont.textContent = `${mint}:0${sec}`;
  } else {
    currentTimeCont.textContent = `${mint}:${sec}`;
  }
}
function findDurationTime() {
  let mint = Math.floor(song.duration / 60);
  let sec = Math.floor(song.duration % 60);
  if (sec < 10) {
    durationCont.textContent = `${mint}:0${sec}`;
  } else {
    durationCont.textContent = `${mint}:${sec}`;
  }
}
song.addEventListener("loadeddata", () => {
  findCrrTime();
  findDurationTime();
  downloadFun()
  totalSong.textContent = `/${songCollection.length}`;
});
songImg.addEventListener("dblclick", (e) => {
  timeUpdate()
  if (e.offsetX >= 180) {
    song.currentTime += 10;
  } else if (e.offsetX <= 120) {
    song.currentTime -= 10;
  }
});
nextIcon.onclick = () => {
  song.currentTime = 0;
  song.duration = 0;
  song = songCollection[songIndex].audio;
  pauseSong();
  playIcon.style.display = "none";
  pauseIcon.style.display = "block";
  songIndex++;
  if (songIndex === songCollection.length) {
    songIndex = 0;
  }
  playSong();
};

previousIcon.onclick = () => {
  playIcon.click();
  song.currentTime = 0;
  song.duration = 0;
  song = songCollection[songIndex].audio;
  pauseSong();
  songIndex--;
  if (songIndex <= 1) {
    songIndex = 8;
  }
  playSong();
};
// repeatIcon.onclick = () =>  repeatIcon.classList.toggle("icon_active");
function timeUpdate() {
  song.addEventListener("timeupdate", () => {
    let songProgress = (song.currentTime / song.duration) * 100;
    progreeLine.style.width = `${songProgress}%`;
    findCrrTime();
    findDurationTime();
    if (repeatIcon.classList.contains(".icon_active")) {
      playSong();
    } else {
      nextPlay();
    }
  });
}

function nextPlay() {
  if (song.currentTime === song.duration) {
    nextIcon.click();
  }
}
repeatIcon.addEventListener("click", () => {
  repeatIcon.classList.toggle("icon_active");
  songNextPlay = false;
  if (songNextPlay == false) {
    song.play();
  }
});

progressBarArea.addEventListener("click", (e) => {
  let progreesWidth = progressBarArea.clientWidth;
  let progreesOffset = e.offsetX;
 
  let songduration = song.duration;
  song.currentTime = (progreesOffset / progreesWidth) * songduration;
  song.play();
  timeUpdate();
  playIcon.click();
});


function volUpdatePlus(){

  
  volume_control.addEventListener("click", (e) => {
    volTotalWidth = volume_control.clientWidth;
    volClickWidth = e.offsetX;
    volFinalPercent = (volClickWidth / volTotalWidth) * 100;
    songVol = volFinalPercent / 100;
    volume_bar.style.width = `${volFinalPercent}%`;
    song.volume = songVol;
    
    if (volFinalPercent >= 99.6) {
      volFinalPercent = 100;
      speakerIcon.style.color = "white";

    } else if (volFinalPercent <= 1.5) {
      volume_bar.style.width = `0%`;
      speakerIcon.style.color = " rgb(230, 62, 40)";

    } else {

      speakerIcon.style.color = "white";
    }
  });
}

volUpdatePlus()
function downloadFun(){


downloadBtn.addEventListener('click',()=>{
  downloadBtn.href = song.src;
})

}

