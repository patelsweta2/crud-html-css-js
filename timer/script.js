let timer;
let seconds = 0;
let running = false;

const timerDisplay = document.getElementById("timer");
const startPauseBtn = document.getElementById("startPause");
const resetBtn = document.getElementById("reset");

function updateDisplay() {
  let hrs = Math.floor(seconds / 3600);
  let mins = Math.floor((seconds % 3600) / 60);
  let secs = seconds % 60;

  timerDisplay.textContent =
    `${hrs.toString().padStart(2, "0")}:` +
    `${mins.toString().padStart(2, "0")}:` +
    `${secs.toString().padStart(2, "0")}`;
}

function startPauseTimer() {
  if (running) {
    clearInterval(timer);
    startPauseBtn.textContent = "Start";
  } else {
    timer = setInterval(() => {
      seconds++;
      updateDisplay();
    }, 1000);
    startPauseBtn.textContent = "Pause";
  }
  running = !running;
}

function resetTimer() {
  clearInterval(timer);
  seconds = 0;
  running = false;
  updateDisplay();
  startPauseBtn.textContent = "Start";
}

startPauseBtn.addEventListener("click", startPauseTimer);
resetBtn.addEventListener("click", resetTimer);
