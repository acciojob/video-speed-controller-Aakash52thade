// Grab elements
const video = document.querySelector('.viewer');
const toggle = document.querySelector('.toggle');
const skipButtons = document.querySelectorAll('[data-skip]');
const progress = document.querySelector('.progress');
const progressFilled = document.querySelector('.progress__filled');

// Given-code style: select all input sliders inside .controls
const inputs = document.querySelectorAll('.controls input');

// === Modified handleUpdate() to control video instead of CSS variables ===
function handleUpdate() {
  // 'this.name' will be either "volume" or "playbackRate"
  video[this.name] = parseFloat(this.value);
}

// Attach to change + mousemove for live updates
inputs.forEach(input => input.addEventListener('change', handleUpdate));
inputs.forEach(input => input.addEventListener('mousemove', handleUpdate));

// Play/Pause toggle
function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

function updateToggleIcon() {
  toggle.textContent = video.paused ? '►' : '❚ ❚';
}

toggle.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateToggleIcon);
video.addEventListener('pause', updateToggleIcon);

// Skip buttons
function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}
skipButtons.forEach(button => button.addEventListener('click', skip));

// Update progress bar as video plays
function updateProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressFilled.style.width = `${percent}%`;
}
video.addEventListener('timeupdate', updateProgress);
