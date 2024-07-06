const quizListSection = document.getElementById("quiz-list");
const quizSelection = document.getElementById("quiz-selection");
const quizContainer = document.getElementById("quiz-container");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let quizzes = JSON.parse(localStorage.getItem("quizzes")) || [];
let currentQuiz = [];
let currentQuestionIndex = 0;
let score = 0;

document.addEventListener("DOMContentLoaded", loadQuizList);

function loadQuizList() {
    quizListSection.style.display = "block";
    quizContainer.style.display = "none";

    quizzes.forEach((quiz, index) => {
        const quizButton = document.createElement("button");
        quizButton.classList.add("btn");
        quizButton.textContent = quiz.name;
        quizButton.addEventListener("click", () => startQuiz(index));

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("btn", "delete-btn");
        deleteButton.textContent = "Delete Quiz";
        deleteButton.addEventListener("click", () => deleteQuiz(index));

        const quizItem = document.createElement("div");
        quizItem.classList.add("quiz-item");
        quizItem.appendChild(quizButton);
        quizItem.appendChild(deleteButton);
        quizSelection.appendChild(quizItem);
    });
}

function startQuiz(index) {
    currentQuiz = quizzes[index].questions;
    currentQuestionIndex = 0;
    score = 0;
    quizListSection.style.display = "none";
    quizContainer.style.display = "block";
    nextButton.textContent = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    const currentQuestion = currentQuiz[currentQuestionIndex];
    questionElement.textContent = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;

    currentQuestion.answers.forEach((answer, index) => {
        if (answer.trim() !== "") { // Only create buttons for non-empty answers
            const button = document.createElement("button");
            button.classList.add("btn");
            button.textContent = answer;
            button.dataset.correct = (index + 1) === parseInt(currentQuestion.correct);
            button.addEventListener("click", selectAnswer);
            answerButtons.appendChild(button);
        }
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === "true";
    if (isCorrect) {
        selectedButton.classList.add("correct");
        score++;
    } else {
        selectedButton.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    let scoreText = `You scored ${score} out of ${currentQuiz.length}!`;
    if (score === currentQuiz.length) {
        scoreText = `Congratulations!🎉 You've scored ${score} out of ${currentQuiz.length}!`;
    }
    questionElement.textContent = scoreText;
    nextButton.textContent = "Play again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < currentQuiz.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < currentQuiz.length) {
        handleNextButton();
    } else {
        startQuiz(quizzes.findIndex(quiz => quiz.questions === currentQuiz));
    }
});

function deleteQuiz(index) {
    quizzes.splice(index, 1);
    localStorage.setItem("quizzes", JSON.stringify(quizzes));
    alert("Quiz deleted successfully!");
    window.location.reload(); // Refresh the page to update the list
}
