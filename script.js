// Elementos del DOM
const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const playIcon = playBtn.querySelector("i");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progress = document.getElementById("progress");
const currentTime = document.getElementById("current-time");
const duration = document.getElementById("duration");
const cover = document.getElementById("cover");
const songItems = document.querySelectorAll("#song-list li");

let currentSongIndex = 0;
let isPlaying = false;

function loadSong(index) {
    const song = songItems[index];
    const src = song.getAttribute("data-src");
    const img = song.getAttribute("data-cover");

    if (src && img) {
        audio.src = src;
        cover.src = img;

        cover.style.opacity = 0;
        cover.onload = () => {
            cover.style.opacity = 1;
        };

        progress.value = 0;
        currentTime.textContent = "0:00";
        duration.textContent = "0:00";
    } else {
        console.warn("Faltan atributos data-src o data-cover");
    }
}

function playSong() {
    audio.play();
    isPlaying = true;
    playIcon.classList.replace("fa-play", "fa-pause");
}

function pauseSong() {
    audio.pause();
    isPlaying = false;
    playIcon.classList.replace("fa-pause", "fa-play");
}

playBtn.addEventListener("click", () => {
    isPlaying ? pauseSong() : playSong();
});

nextBtn.addEventListener("click", () => {
    currentSongIndex = (currentSongIndex + 1) % songItems.length;
    loadSong(currentSongIndex);
    playSong();
});

prevBtn.addEventListener("click", () => {
    currentSongIndex = (currentSongIndex - 1 + songItems.length) % songItems.length;
    loadSong(currentSongIndex);
    playSong();
});

audio.addEventListener("timeupdate", () => {
    if (audio.duration) {
        const percent = (audio.currentTime / audio.duration) * 100;
        progress.value = percent;
        currentTime.textContent = formatTime(audio.currentTime);
        duration.textContent = formatTime(audio.duration);
    }
});

progress.addEventListener("input", () => {
    if (audio.duration) {
        audio.currentTime = (progress.value / 100) * audio.duration;
    }
});

function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? "0" + sec : sec}`;
}

songItems.forEach((item, index) => {
    item.addEventListener("click", () => {
        currentSongIndex = index;
        loadSong(index);
        playSong();
    });
});

window.addEventListener("DOMContentLoaded", () => {
    loadSong(currentSongIndex);
});