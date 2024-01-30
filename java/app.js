let progress = document.querySelector("#progress");
let song = document.querySelector("#song");
let ctrlIcon = document.querySelector("#ctrlIcon");
let songImg = document.querySelector(".song-img"); 
let songNumber = document.querySelector("#songNumber"); 

let songs = [
    {
        title: "No Love",
        artist: "Shubh",
        src: "./song/y2mate.com - No Love Official Audio  Shubh.mp3",
        img:"./img/csc.jpg"
    },
    {
        title: "Top Flame",
        artist: "Jerry",
        src: "./song/y2mate.com - Top Flame  Slowed  Reverb   Jerry.mp3",
        img: "./img/sddefault.jpg"
    },
    {
        title: "Lalkara",
        artist: "Diljit Dosanjh",
        src: "./song/y2mate.com - Diljit Dosanjh Lalkaara Official Audio  Feat Sultaan  GHOST  Intense Raj Ranjodh.mp3",
        img: "./img/download.jpeg"
    },
];

let songIndex = 0;

function loadSong(song) {
    document.querySelector("h1").innerText = song.title;
    document.querySelector("p").innerText = song.artist;
    document.querySelector("#song").src = song.src;
    songImg.src = song.img; 
    songNumber.innerText = (songIndex + 1) + " of " + songs.length; 
    playPause();
}

function playNextSong() {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songs[songIndex]);
}

function playPreviousSong() {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songs[songIndex]);
}

ctrlIcon.addEventListener('click', playPause);

song.onloadedmetadata = function () {
    progress.max = song.duration;
    progress.value = song.currentTime;
}

function playPause() {
    if (song.paused) {
        song.play();
        ctrlIcon.classList.add("fa-pause");
        ctrlIcon.classList.remove("fa-play");
    } else {
        song.pause();
        ctrlIcon.classList.remove("fa-pause");
        ctrlIcon.classList.add("fa-play");
    }
}

song.onplay = function() {
    setInterval(() => {
        progress.value = song.currentTime;
    }, 500);
}

progress.onchange = function () {
    song.currentTime = progress.value;
}

// Load the first song when the page loads
window.onload = function() {
    loadSong(songs[songIndex]);
    songNumber.innerText = (songIndex + 1) + " of " + songs.length; // Add this line
}

document.querySelector(".fa-backward").parentNode.addEventListener('click', playPreviousSong);
document.querySelector(".fa-forward").parentNode.addEventListener('click', playNextSong);
