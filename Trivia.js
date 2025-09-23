let questions = []; 
let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 15;
let totalTime = 0;


function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}


function decodeHTML(str) {
    const txt = document.createElement("textarea");
    txt.innerHTML = str;
    return txt.value;
  }
  

const settings = JSON.parse(localStorage.getItem("triviaSettings")) || {
  category: "",
  difficulty: "easy",
  type: "multiple",
  amount: 10
};


const apiUrl = `https://opentdb.com/api.php?amount=${settings.amount}&category=${settings.category}&difficulty=${settings.difficulty}&type=${settings.type}`;

// Fetch questions
async function loadQuestions() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    questions = data.results;

    if (questions.length === 0) {
      alert("No questions found. Please try different settings.");
      window.location.href = "index.html";
    } else {
      startGame();
    }
  } catch (error) {
    console.error("Error loading questions:", error);
    alert("Failed to load questions. Try again.");
    window.location.href = "index.html";
  }
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
      document.getElementById("question-text").innerHTML = decodeHTML(q.question);

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
      document.getElementById("timer").textContent = `Time: ${timeLeft}s`;
  
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


window.onload = loadQuestions;