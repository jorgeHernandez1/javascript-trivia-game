var startBtn = document.querySelector("#startButton");
var timeLeftEle = document.querySelector("#timeLeft");
var interval;

function init() {
  //initiates timer
  startTimer();
  //clear intro page elements
  var introSection = document.querySelectorAll(".openingElement");
  introSection.forEach((ele) => {
    ele.remove();
  });

  //load divs that we will use to display questions and rows
  
  var questions = getQuestions();
  var answers = getAnswers();

  
}

function startTimer() {
  //starts timer at top right of screen and sets interval
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

function getQuestions() {
  //dictionaru where key=question and value=Array of possible answers
  var dict = new Map();

  dict.set(
    "String, Booleans, Numbers, and Objects are all examples of different JavaScript data ____.",
    ["array", "type", "variable", "element"]
  );

  dict.set(
    "Which of the following comparison opeartors is equivilant to does not equal?",
    ["=", "?=", "==", "!="]
  );

  dict.set("Which keyword tells the browser to create a variable?", [
    "map",
    "var",
    "mk",
    "for",
  ]);

  dict.set(
    "Which characters can be used to create a comment in a javascript file?",
    ["<!---->", "//", "\\", "??"]
  );

  dict.set(
    "Which characters can be used to create a comment in an html file?",
    ["<!---->", "//", "\\", "??"]
  );

  dict.set(
    "What function allows a user to run a function every x milliseconds?",
    ["setInterval();", "setTimeout();", "runOnInterval();", "runFunction();"]
  );

  dict.set(
    "The functions toLowerCase(), toUpperCase(), and trim() modify which of the following data types?",
    ["Number", "Object", "String", "Text"]
  );
  return dict;
}

function getAnswers() {
  //dictionary where key=question value=answer
  var dict = new Map();

  dict.set(
    "String, Booleans, Numbers, and Objects are all examples of different JavaScript data ____.",
    "type"
  );

  dict.set(
    "Which of the following comparison opeartors is equivilant to does not equal?",
    "!="
  );

  dict.set("Which keyword tells the browser to create a variable?", "var");

  dict.set(
    "Which characters can be used to create a comment in a javascript file?",
    "//"
  );

  dict.set(
    "Which characters can be used to create a comment in an html file?",
    "<!---->"
  );

  dict.set(
    "What function allows a user to run a function every x milliseconds?",
    "setInterval();"
  );

  dict.set(
    "The functions toLowerCase(), toUpperCase(), and trim() modify which of the follwing data types?",
    ["setInterval();", "setTimeout();", "runOnInterval();", "runFunction();"]
  );

  dict.set(
    "The functions toLowerCase(), toUpperCase(), and trim() modify which of the following data types?",
    "String"
  );
  return dict;
}

function gameOver() {
  //TO-DO Navigate to game over screen
  alert("game over");
  clearInterval(interval);
}

startBtn.addEventListener("click", init);
