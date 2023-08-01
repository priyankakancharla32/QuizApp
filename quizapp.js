//getting all required elements
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const option_list = document.querySelector(".option_list");
const submit_btn = quiz_box.querySelector(".submit_btn");
let timerInterval; // Variable to store the timer interval

// If Start Quiz  Button Clicked
start_btn.onclick = () => {
  info_box.classList.add("activeInfo"); //show the info box
};
// If Exit Button Clicked
exit_btn.onclick = () => {
    console.log("hello")
    info_box.classList.remove("activeInfo"); // hide the info box
    // window.close(); // Close the window (may not work in all cases)
  };
// If Continue Button Clicked
continue_btn.onclick = () => {
    timerInterval = setInterval(updateTimer, 1000); // Call updateTimer function every 1 second (1000 milliseconds)

  info_box.classList.remove("activeInfo"); //hide the info box
  quiz_box.classList.add("activeQuiz"); //show the Quiz box
  showQuestions(0);
  queCounter(1);
};

let que_count = 0;
let que_num = 1;

const next_btn = quiz_box.querySelector(".next_btn");

//If next button clicked
next_btn.onclick = () => {
  if (que_count < questions.length - 1) {
    que_count++;
    que_num++;
    showQuestions(que_count);
    queCounter(que_num);
  } else {
    console.log("Questions Completed");
  }
};

// getting questions and options from array

function showQuestions(index) {
  const que_text = document.querySelector(".que_text");
  const timer_sec = document.querySelector(".timer_sec");
  timer_sec.textContent = quizTimeLimit;
  let que_tag =
    "<span>" +
    questions[index].num +
    ". " +
    questions[index].question +
    "</span>";
  let option_tag =
    '<div class="option">' +
    questions[index].options[0] +
    "<span></span></div>" +
    '<div class="option">' +
    questions[index].options[1] +
    "<span></span></div>" +
    '<div class="option">' +
    questions[index].options[2] +
    "<span></span></div>" +
    '<div class="option">' +
    questions[index].options[3] +
    "<span></span></div>";
  que_text.innerHTML = que_tag;
  option_list.innerHTML = option_tag;

  const option = option_list.querySelectorAll(".option");
  for (let i = 0; i < option.length; i++) {
    option[i].setAttribute("onclick", "optionSelected(this)");
  }
}

function optionSelected(answer) {
  const userAns = answer.textContent.trim();
  const correctAns = questions[que_count].answer;
  const allOptions = option_list.children;

  if (userAns === correctAns) {
    answer.classList.add("correct");
    console.log("Answer is Correct");
  } else {
    answer.classList.add("incorrect");
    console.log("Answer is Wrong");
  }

  // Once the user selected, disable all options
  for (let i = 0; i < allOptions.length; i++) {
    allOptions[i].classList.add("disabled");
  }
}
// Initialize an array to store the user's selected answers
let userAnswers = [];

function optionSelected(answer) {
  const userAns = answer.textContent.trim();
  const correctAns = questions[que_count].answer;

  // Store the user's selected answer for the current question
  userAnswers[que_count] = userAns;

  const allOptions = option_list.children;

  if (userAns === correctAns) {
    answer.classList.add("correct");
    console.log("Answer is Correct");
  } else {
    answer.classList.add("incorrect");
    console.log("Answer is Wrong");
  }

  // Once the user selected, disable all options
  for (let i = 0; i < allOptions.length; i++) {
    allOptions[i].classList.add("disabled");
  }
}

function submitQuiz(event) {
  event.preventDefault(); // Prevent form submission behavior
  clearInterval(timerInterval);

  let correctAnswers = 0;
  const totalQuestions = questions.length;

  // Loop through all questions to check the answers
  for (let i = 0; i < totalQuestions; i++) {
    const selectedOption = userAnswers[i]; // Get the user's selected answer
    const correctOption = questions[i].answer; // Get the correct answer

    if (selectedOption === correctOption) {
      correctAnswers++;
    }
  }


  // Calculate the score percentage
  const score = (correctAnswers / totalQuestions) * 100;

  // Hide the quiz box
  quiz_box.classList.remove("activeQuiz");

  // Show the result box
  const result_box = document.querySelector(".result_box");
  result_box.style.opacity = "1";
  result_box.style.pointerEvents = "auto";

  // Display the score
  const score_text = result_box.querySelector(".score_text");
  score_text.innerHTML = `You scored <p>${correctAnswers}</p> out of <p>${totalQuestions}</p>`;

  // Display a different message based on the score
  const complete_text = result_box.querySelector(".complete_text");
  if (score >= 60) {
    complete_text.textContent = "Congratulations! You passed the quiz.";
  } else {
    complete_text.textContent = "Better luck next time.";
  }
}

submit_btn.addEventListener("click", submitQuiz);

function queCounter(index) {
  const bottom_ques_counter = quiz_box.querySelector(".total_que");
  const totalQuestions = questions.length;
  let totalQuesCountTag = `<span><p>${index}</p>of <p>${totalQuestions}</p>Questions</span>`;
  bottom_ques_counter.innerHTML = totalQuesCountTag;
}
const replay_btn = document.querySelector(".result_box .buttons .restart");
replay_btn.onclick = () => {
  quiz_box.classList.add("activeQuiz"); // Show the Quiz box
  result_box.style.opacity = "0"; // Hide the result box
  result_box.style.pointerEvents = "none";
  que_count = 0;
  que_num = 1;
  userAnswers = []; // Reset the user's selected answers
  showQuestions(que_count);
  queCounter(que_num);
  const options = option_list.querySelectorAll(".option");
  for (let i = 0; i < options.length; i++) {
    options[i].classList.remove("disabled", "correct", "incorrect");
  }
};
const quit_btn = document.querySelector(".result_box .buttons .quit");
  quit_btn.onclick = () => {
    info_box.classList.remove("activeInfo"); // hide the info box

    // window.close(); // Close the window (may not work in all cases)
  };

  // If Result Box Clicked
  const result_box = document.querySelector(".result_box");
  result_box.onclick = () => {
    result_box.style.opacity = "0"; // Hide the result box
    result_box.style.pointerEvents = "none";
  };
  const quizTimeLimit = 30; // 5 minutes (5 minutes * 60 seconds)
let timeLeft = quizTimeLimit;

function updateTimer() {
  const timer_sec = document.querySelector(".timer_sec");
  timer_sec.textContent = timeLeft;

  if (timeLeft > 0) {
    timeLeft--;
  } else {
    // Time's up, submit the quiz automatically
    clearInterval(timerInterval);
    submitQuiz();
  }
}