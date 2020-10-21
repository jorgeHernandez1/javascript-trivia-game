var timeLeftEle = $("#timeLeft");
//timer interval
var interval;
//page element containers
var questionRow;
var answersRow;
var resultRow;
var questions = getQuestions();
var correctAnswers;

function init() {
  //clean up intro page
  clearMainContent();
  //start game
  //print random question and possible answers to screen
  printRandomQuestion();
  //initiates timer
  startTimer();
}

function clearMainContent() {
  //clear intro page elements
  var introSection = document.querySelectorAll(".openingElement");
  introSection.forEach((ele) => {
    ele.remove();
  });

  //add ids to divs that we will use to display questions, answers and results
  var rows = document.getElementsByClassName("row");
  rows.item(0).id = "questionRow";
  rows.item(1).id = "answersRow";
  rows.item(2).id = "resultRow";
  //add isd to indentify rows
  questionRow = $("#questionRow div");
  answersRow = $("#answersRow div");
  resultRow = $("#resultRow div");

  // add on click to answers
  $(document).on("click", ".answer", answerClick);
}

function printRandomQuestion() {
  //set random question global vars
  var randomQuestion;
  var question;
  var possibleAnswers;

  questionRow.empty();
  answersRow.empty();

  randomQuestion = getRandomQuestion();
  //question and answer may not be set if end of questions is reached
  try {
    question = randomQuestion.question;
    possibleAnswers = randomQuestion.answers;
    //print question
    questionRow.append("<h1>" + question + "</h1>");
    //print buttons/possible answers

    for (let index = 0; index < possibleAnswers.length; index++) {
      const answer = possibleAnswers[index];
      var btnDiv = $("<div>");
      var btn = $("<a>" + answer + "</a>");
      btn.addClass("btn my-1 answer");
      btnDiv.append(btn);
      btnDiv.append("<br>");
      answersRow.append(btnDiv);
    }
  } catch (err) {
    console.log("Game Over!")
  }
}

function startTimer() {
  //starts timer at top right of screen and sets interval
  interval = setInterval(function () {
    //collect current time from UI and subtract 1 to set new value
    var timeLeft = parseInt(timeLeftEle.text());
    timeLeft--;
    //if timer runs out then game is over
    if (timeLeft >= 0) {
      timeLeftEle.text(timeLeft);
    } else {
      gameOver();
    }
  }, 1000);
}

function getRandomQuestion(question, answers) {
  //checks to make sure we haven't ran out of wuestions in the public questions map
  if (questions.size === 0) {
    gameOver();
  } else {
    //get random number to use as index that is the size of our current questions map
    var rand = Math.floor(Math.random() * questions.size);
    // The key at rand index
    question = Array.from(questions.keys())[rand];
    // The value of the item at rand index
    answers = questions.get(question);
    //remove used question
    questions.delete(question);

    return {
      question: question,
      answers: answers,
    };
  }
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
    ["&lt;!----&gt;", "//", "\\\\", "??"]
  );

  dict.set(
    "Which characters can be used to create a comment in an html file?",
    ["&lt;!----&gt;", "//", "\\\\", "??"]
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
    "The functions toLowerCase(), toUpperCase(), and trim() modify which of the following data types?",
    "String"
  );
  return dict;
}

function answerClick() {
  //print new question
  printRandomQuestion();
  //display result of previos selection
  var question = $("#questionRow").text().trim();
  var selectedAnswer = $(this).text().trim();
  var result = isCorrectAnswer(question, selectedAnswer);
  //create result div
  var resultDiv = $("<div>");
  resultDiv.text(result);
  //add styling classes
  resultDiv.addClass("text-muted font-italic border-top");
  //append to results row
  resultRow.append(resultDiv);
  //wait 2 seconds then clear result
  setTimeout(function () {
    resultRow.empty();
  }, 2000);
}

function isCorrectAnswer(question, selectedAnswer) {
  //pulls in answers map
  var answers = getAnswers();
  //checks to see if the returned answer for the provided question matches the
  //user selectedAnswer
  if (answers.get(question) === selectedAnswer) {
    correctAnswers++;
    return "Correct!";
  } else {
    return "Wrong!";
  }
}

function gameOver() {
  //TO-DO Navigate to game over screen
  alert("game over");
  clearInterval(interval);
}

$("#startButton").on("click", init);
