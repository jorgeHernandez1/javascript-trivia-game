var startBtn = document.querySelector("#startButton");
var timeLeftEle = document.querySelector("#timeLeft");
var interval;

function init() {
  //initiates timer
  startTimer();
  //starts displaying questions

  //game over screen
  //gameOver();
}

function startTimer() {
  //starts timer at top right of screen
  interval = setInterval(function () {
    //collect current time from UI and subtract 1 to set new value
    var timeLeft = parseInt(timeLeftEle.textContent);
    timeLeft--;
    //if timer runs out then game is over
    if (timeLeft >= 0) {
      timeLeftEle.textContent = timeLeft;
    } else {
      gameOver();
    }
  }, 1000);
}

function gameOver() {
    //TO-DO Navigate to game over screen
  alert("game over");
  clearInterval(interval);
}

startBtn.addEventListener("click", init);
