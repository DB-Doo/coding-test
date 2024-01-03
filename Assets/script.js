// GIVEN I am taking a code quiz
// WHEN I click the start button
// THEN a timer starts and I am presented with a question
// WHEN I answer a question
// THEN I am presented with another question
// WHEN I answer a question incorrectly
// THEN time is subtracted from the clock
// WHEN all questions are answered or the timer reaches 0
// THEN the game is over
// WHEN the game is over
// THEN I can save my initials and my score

const quizQuestions = [
    {
        question: "What is the purpose of CSS in web development?",
        answers: ["To create the structure of web pages", "To style web pages", "To add interactivity to web pages", "To store data on the server"],
        correctAnswer: "To style web pages"
    },
    {
        question: "Which HTML tag is used to create clickable links?",
        answers: ["<link>", "<a>", "<href>", "<click>"],
        correctAnswer: "<a>"
    },
    {
        question: "What does 'www' stand for in a website address?",
        answers: ["Web Wide World", "World Wide Web", "Wide Web World", "World Web Wide"],
        correctAnswer: "World Wide Web"
    },
    {
        question: "Which of these is a JavaScript data type?",
        answers: ["String", "<div>", "CSS", "href"],
        correctAnswer: "String"
    },
    {
        question: "What is the main function of the <body> tag in HTML?",
        answers: ["To contain metadata", "To define the document head", "To contain the main content of a web page", "To link CSS files"],
        correctAnswer: "To contain the main content of a web page"
    },
    // Add more questions here
];


let currentQuestionIndex = 0;
let timeLeft = 60; // time limit
let timerInterval;

// start quiz Function
function startQuiz() {
    //hides the start screen
    document.getElementById('start-screen').style.display = 'none';

    // shows the question screen
    document.getElementById('question-screen').style.display = 'block';

    // starts a timer that calls the updateTimer function every 1 sec
    timerInterval = setInterval(updateTimer, 1000);

    // displays the first question(or should/ debug)
    showQuestion();
}

// Update timer function
function updateTimer() {
    // timer ticks down 1 sec at a time
    timeLeft--;

    // update id with current time left
    document.getElementById('timer').innerText = `Time: ${timeLeft}s`;

    // game end if timer runs out
    if (timeLeft <= 0) {
        endQuiz();
    }
}

// Show current question function
function showQuestion() {
    // retrieves the current question based on currentQuestionIndex
    const questionData = quizQuestions[currentQuestionIndex];

    // updates the question text on the page
    document.getElementById('question').innerText = questionData.question;

    // finds the element to display the answers
    const answersElement = document.getElementById('answers');

    // clears any previous answers from the element
    answersElement.innerHTML = '';

    // loops through each answer in the current question
    questionData.answers.forEach(answer => {
        // creates a new button element for each answer
        const button = document.createElement('button');

        // sets the button text to the answer
        button.innerText = answer;

        // adds an event listener to the button to handle answer selection when clicked
        button.addEventListener('click', () => handleAnswer(answer));

        // adds the button to the answersElement on the page
        answersElement.appendChild(button);
    });
}

// handle the answer selection Function
function handleAnswer(selectedAnswer) {
    // Checks to see if the answer the user selected is the right one
    if (selectedAnswer !== quizQuestions[currentQuestionIndex].correctAnswer) {
        // if user answers incorrectly timer deducts 10 seconds
        timeLeft -= 10;
    }

    // Goes to the next question by increasing the index 
    currentQuestionIndex++;

    // If there's more questions to show then show them, if not then end quiz
    if (currentQuestionIndex < quizQuestions.length) {
        showQuestion();
    } else {
        endQuiz();
    }
}

// end quiz function

// Submitscore function

// Attach event listeners

// add a click listener to start button
document.getElementById('start-btn').addEventListener('click', startQuiz);

