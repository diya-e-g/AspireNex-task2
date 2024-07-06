const createQuizSection = document.getElementById("create-quiz");
const quizCreator = document.getElementById("quiz-creator");
const numQuestionsInput = document.getElementById("num-questions");
const startCreateQuizBtn = document.getElementById("start-create-quiz");
const saveQuizBtn = document.getElementById("save-quiz-btn");

let quizzes = JSON.parse(localStorage.getItem("quizzes")) || [];

startCreateQuizBtn.addEventListener("click", () => {
    const numQuestions = numQuestionsInput.value;
    if (numQuestions > 0) {
        startQuizCreation(numQuestions);
    }
});

saveQuizBtn.addEventListener("click", saveQuiz);

function startQuizCreation(numQuestions) {
    createQuizSection.style.display = "none";
    quizCreator.style.display = "block";
    const form = document.getElementById("creator-form");
    form.innerHTML = "";

    for (let i = 0; i < numQuestions; i++) {
        const questionDiv = document.createElement("div");
        questionDiv.classList.add("question-block");
        questionDiv.innerHTML = `
            <label>Question ${i + 1}:</label>
            <input type="text" class="question-input">
            <label>Answer 1:</label>
            <input type="text" class="answer-input">
            <label>Answer 2:</label>
            <input type="text" class="answer-input">
            <label>Answer 3:</label>
            <input type="text" class="answer-input">
            <label>Answer 4:</label>
            <input type="text" class="answer-input">
            <label>Correct Answer (1-4):</label>
            <input type="number" class="correct-answer" min="1" max="4">
        `;
        form.appendChild(questionDiv);
    }
}

function saveQuiz() {
    const questionBlocks = document.querySelectorAll(".question-block");
    const newQuiz = [];

    questionBlocks.forEach(block => {
        const question = block.querySelector(".question-input").value;
        const answers = Array.from(block.querySelectorAll(".answer-input")).map(input => input.value);
        const correctAnswer = block.querySelector(".correct-answer").value;
        newQuiz.push({
            question,
            answers,
            correct: correctAnswer
        });
    });

    const quizName = prompt("Enter a name for your quiz:");
    if (quizName) {
        quizzes.push({
            name: quizName,
            questions: newQuiz
        });
        localStorage.setItem("quizzes", JSON.stringify(quizzes));
        alert("Quiz saved successfully!");
        window.location.href = "index.html"; // Redirect to home page
    }
}

