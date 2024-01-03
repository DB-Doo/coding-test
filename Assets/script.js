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
    console.log("start quiz  function called");
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
    console.log("update timer function called");
    // timer ticks down 1 sec at a time
    timeLeft--;

    // update id with current time left
    document.getElementById('timer').innerText = `Time: ${timeLeft}s`;

    // game end if timer runs out
    if (timeLeft <= 0) {
        endQuiz();
    }
}

// handle the answer selection Function
function handleAnswer(selectedAnswer, answerButton) {
    console.log("handle answer function called");
    // disable all answer buttons to prevent multiple answers
    document.querySelectorAll('#answers button').forEach(button => {
        button.disabled = true;
        console.log("buttons disabled correctly");

        // if the buttons answer is the correct one highlight it in green
        if (button.innerText === quizQuestions[currentQuestionIndex].correctAnswer) {
            button.style.backgroundColor = 'lightgreen';
        }
    });

    // shows user whether selected answer is right or not 
    if (selectedAnswer === quizQuestions[currentQuestionIndex].correctAnswer) {
        answerButton.style.backgroundColor = 'green';
    } else {
        // wrong answer will turn red if user chooses it
        answerButton.style.backgroundColor = 'red';
        // if user answers incorrectly timer deducts 10 seconds from total time. possible to get a negative score due to answering wrong below 10 seconds
        timeLeft -= 10;
    }

    // wait 1 sec before showing the next question or end quiz
    setTimeout(() => {
        // goes to the next question by increasing question index
        currentQuestionIndex++;
        // if theres more questions to show then show them, if not then end quiz
        if (currentQuestionIndex < quizQuestions.length) {
            showQuestion();
        } else {
            endQuiz();
        }
    }, 1000); // 1 sec delay so user can see if they got it right or not 
}


// Show current question function
function showQuestion() {
    console.log("show question function called");
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
        button.addEventListener('click', () => handleAnswer(answer, button));

        // adds the button to the answersElement on the page
        answersElement.appendChild(button);
    });
}
// end quiz function
function endQuiz() {
    console.log("endQuiz function called");
    // Stops timer
    clearInterval(timerInterval);

    // hides the question screen
    document.getElementById('question-screen').style.display = 'none';

    // Show end screen 
    document.getElementById('end-screen').style.display = 'block';

    // score is displayed which is equal to time left
    document.getElementById('final-score').innerText = `Your score: ${timeLeft}`;
}

// Submitscore function
function submitScore() {
    console.log("submitScore function called");
    // Gets the initials from the input field that user put in 
    const initials = document.getElementById('initials').value;

    // gets the high scores from localStorage, or creates a new empty array if not found
    const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

    // push the new score to the high scores array
    highScores.push({ initials, score: timeLeft });

    // Saves the updated high scores array to localStorage.
    localStorage.setItem('highScores', JSON.stringify(highScores));

    // update and display the high scores
    showHighScores();

}

function showHighScores() {
    console.log("showHighScores called");
    const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    highScores.sort((a, b) => b.score - a.score);

    // build high score list
    const highScoresList = document.getElementById('high-scores-list');
    highScoresList.innerHTML = ''; // clear existing list items

    // take the top 5 scores and display them
    highScores.slice(0, 5).forEach(score => {
        const scoreElement = document.createElement('li');
        scoreElement.textContent = `${score.initials}: ${score.score}`;
        highScoresList.appendChild(scoreElement);
    });

    // hide the end screen to prevent multiple submissions
    document.getElementById('end-screen').style.display = 'none';
    // display high scores!
    document.getElementById('high-scores').style.display = 'block';
}


// Attach event listeners
// click listener to start button
document.getElementById('start-btn').addEventListener('click', startQuiz);

// Click listener for submit score button 
document.getElementById('submit-score').addEventListener('click', submitScore);
