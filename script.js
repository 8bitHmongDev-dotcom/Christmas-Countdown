const days = document.getElementById('days');
const hours = document.getElementById('hours');
const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');
const countdown = document.getElementById('countdown');
const year = document.getElementById('year');
const loading = document.getElementById('loading');

const currentYear = new Date().getFullYear();

const newYearTime = new Date(`December 25 ${currentYear} 00:00:00`);

// Update countdown time
function updateCountdown() {
  const currentTime = new Date();
  const diff = newYearTime - currentTime;

  const d = Math.floor(diff / 1000 / 60 / 60 / 24);
  const h = Math.floor(diff / 1000 / 60 / 60) % 24;
  const m = Math.floor(diff / 1000 / 60) % 60;
  const s = Math.floor(diff / 1000) % 60;

  // Add values to DOM
  days.innerHTML = d;
  hours.innerHTML = h < 10 ? '0' + h : h;
  minutes.innerHTML = m < 10 ? '0' + m : m;
  seconds.innerHTML = s < 10 ? '0' + s : s;
}

// Show spinner before countdown
setTimeout(() => {
  loading.remove();
  countdown.style.display = 'flex';
}, 1000);

// Run every second
setInterval(updateCountdown, 1000);


const playlist = [
  "./music/1.mp3",
  "./music/2.mp3",
  "./music/3.mp3",
  "./music/4.mp3",
  "./music/5.mp3",
  "./music/6.mp3",
  "./music/7.mp3",
  "./music/8.mp3",
  "./music/9.mp3",
  "./music/10.mp3",
  "./music/11.mp3"
];

// Create audio player
const player = document.createElement("audio");
player.autoplay = true;
player.playsInline = true; 
player.muted = true; // Helps bypass autoplay restrictions
document.body.appendChild(player);

// Start with a random song
let currentTrack = Math.floor(Math.random() * playlist.length);
player.src = playlist[currentTrack];

// Start playback and unmute shortly after
player.play().then(() => {
  setTimeout(() => {
    player.muted = false;
  }, 300);
}).catch(() => {
  // If blocked, user will trigger play with button
});

// When song ends, pick a new random track (not same as last)
player.addEventListener("ended", () => {
  let newTrack;
  do {
    newTrack = Math.floor(Math.random() * playlist.length);
  } while (newTrack === currentTrack);
  
  currentTrack = newTrack;
  player.src = playlist[currentTrack];
  player.play();
});

// Play / Pause Button
const btn = document.getElementById("playPauseButton");
btn.style.opacity = "1"; // default look

btn.addEventListener("click", () => {
  if (player.paused) {
    player.play();
    btn.style.opacity = "1";
  } else {
    player.pause();
    btn.style.opacity = "0.5";
  }
});
