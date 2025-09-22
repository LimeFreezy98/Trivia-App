let questions = []; 
let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 15;
let totalTime = 0;


function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

function startGame() {
    currentQuestionIndex = 0;
    score = 0;
    totalTime = 0;
    showQuestion();
  }
//   show question ui 
  function showQuestion() {
    clearInterval(timer);
    timeLeft = 15;
    document.getElementById("timer").textContent = `time: ${timeLeft}s`;

    const q = questions[currentQuestionIndex];
    document.getElementById("question-number").textContent =
      `Question ${currentQuestionIndex + 1} of ${questions.length}`;
    document.getElementById("question-text").innerHTML = q.question;

    const answerButtons = document.getElementById("answer-buttons");
    answerButtons.innerHTML = "";

    const answers = shuffleArray([q.correct_answer, ...q.incorrect_answers]);
    answers.forEach(answer => {
      const button = document.createElement("button");
      button.classList.add("btn", "btn-outline-primary", "btn-lg", "w-100");
      button.textContent = answer;
      button.onclick = () => selectAnswer(answer, q.correct_answer);
      answerButtons.appendChild(button);
    });
    document.getElementById("feedback").textContent = "";
    document.getElementById("nextBtn").classList.add("d-none");
  
    startTimer();
  }


// Handle answer
function selectAnswer(answer, correct) {
    clearInterval(timer);
    const feedback = document.getElementById("feedback");
  
    if (answer === correct) {
      score++;
      feedback.textContent = "Correct!";
      feedback.classList.add("text-success");
      feedback.classList.remove("text-danger");
    } else {
      feedback.textContent = `Wrong! Correct answer: ${correct}`;
      feedback.classList.add("text-danger");
      feedback.classList.remove("text-success");
    }
  
    document.getElementById("nextBtn").classList.remove("d-none");
  }

  // display Timer
function startTimer() {
    timer = setInterval(() => {
      timeLeft--;
      totalTime++;
      document.getElementById("timer").textContent = `⏳ ${timeLeft}s`;
  
      if (timeLeft <= 0) {
        clearInterval(timer);
        selectAnswer("", questions[currentQuestionIndex].correct_answer);
      }
    }, 1000);
  }

  
  document.getElementById("nextBtn").addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      endGame();
    }
  });


  // End game
 function endGame() {
  document.getElementById("final-score").textContent = `Your Score: ${score} / ${questions.length}`;
  document.getElementById("time-taken").textContent = `Total Time: ${totalTime} seconds`;

  const modal = new bootstrap.Modal(document.getElementById("resultsModal"));
  modal.show();
}


  window.onload = startGame;