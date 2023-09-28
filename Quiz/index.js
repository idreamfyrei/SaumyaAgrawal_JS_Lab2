//prototype- Object is automatically get 1 property that is called protype
//Quiz Prototype
function Quiz(questions) {
  this.score = 0;
  this.questionIndex = 0;
  this.questions = questions;
}
//function to return questions from current index number
Quiz.prototype.getQuestionByIndex = function () {
  return this.questions[this.questionIndex];
};


//function to check end of the quiz
Quiz.prototype.isEnded = function () {
  return this.questions.length === this.questionIndex;
};


//function to check correct answer and move to next question index
Quiz.prototype.checkOptionWithAnswer = function (answer) {
  if (this.getQuestionByIndex().isCorrectAnswer(answer)) {
    this.score++;
  }
  this.questionIndex++;
};


//Question Prototype
function Question(text, choices, answer) {
  this.text = text;
  this.choices = choices;
  this.answer = answer;
}
Question.prototype.isCorrectAnswer = function (choice) {
  return this.answer === choice;
};


//to load questions on HTML page 1 by 1
function displayQuestions() {
  if (quiz.isEnded()) {
    showScores();
  } else {
    //show next question
    var element = document.getElementById("question");      //fetch <p id="question">
    element.innerHTML = quiz.getQuestionByIndex().text;

    //display choices
    var choices = quiz.getQuestionByIndex().choices;
    for (let i = 0; i < choices.length; i++) {
      //Fetch span to display choice
      var elem = document.getElementById("choice" + i);
      elem.innerHTML = choices[i];
      handleOptionButton("btn" + i, choices[i]);
    }
    showProgress();
  }
}


function handleOptionButton(id, choice) {
  var button = document.getElementById(id);
  button.onclick = function () {
    quiz.checkOptionWithAnswer(choice);
    displayQuestions();
  };
}


//show progress bar
function showProgress() {
  var currentQuestionNumber = quiz.questionIndex + 1;
  var progressbar = document.getElementById("progress");
  progressbar.innerHTML =
    "Question " + currentQuestionNumber + " of " + quiz.questions.length;
}


//show score function
function showScores() {
  var result = "<h1>Result<h1><h2 id='score'> Your Score: ";
  result += quiz.score;
  result +=
    "<br>Your percentage is: " + (quiz.score / questions.length) * 100 + " %";
  //fetch quiz div and put result over it
  var element = document.getElementById("quiz");
  element.innerHTML = result;
}


// Array of Object of Questions
var questions = [
  new Question(
    "JavaScript supports",
    ["Functions", "XHTML", "CSS", "HTML"],
    "Functions"
  ),
  new Question(
    "Which language is used for styling web pages?",
    ["HTML", "JQuery", "CSS", "XML"],
    "CSS"
  ),
  new Question(
    "Which is not a JavaScript Framework?",
    ["Python Script", "JQuery", "Django", "NodeJS"],
    "Django"
  ),
  new Question(
    "Which is used for Connect To Database?",
    ["PHP", "HTML", "JS", "All"],
    "PHP"
  ),
  new Question(
    "JavaScript is a ",
    ["Language", "Programming Language", "Development", "All"],
    "Programming Language"
  ),
];


//create object of quiz
var quiz = new Quiz(questions);

displayQuestions();
