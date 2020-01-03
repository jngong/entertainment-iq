let userScore = 0; // Track user score
let questionsRemaining = 12; // Track # questions remaining
let triviaQuestions = []; // Store array of questions from API

// Store DOM elements
let filmButton = document.querySelector('#film')
let tvButton = document.querySelector('#tv')
let musicButton = document.querySelector('#music')
let categoryContainer = document.querySelector('.category-container')
let questionContainer = document.querySelector('.question-container')

// Event listeners
filmButton.addEventListener('click', filmQuestions)
tvButton.addEventListener('click', tvQuestions)
musicButton.addEventListener('click', musicQuestions)

// Async functions to pull API data based on category button clicked.
async function filmQuestions() {
    try {
        let response = await axios.get(`https://opentdb.com/api.php?amount=12&type=multiple&category=11`)
        triviaQuestions = response.data.results
        hideCategories();
    } catch {
        console.log(`Error occured: ${err}`);
            console.log(err.response)
    }
}

async function tvQuestions() {
    try {
        let response = await axios.get(`https://opentdb.com/api.php?amount=12&type=multiple&category=14`)
        triviaQuestions = response.data.results
        hideCategories();
    } catch {
        console.log(`Error occured: ${err}`);
            console.log(err.response)
    }
}

async function musicQuestions() {
    try {
        let response = await axios.get(`https://opentdb.com/api.php?amount=12&type=multiple&category=12`)
        triviaQuestions = response.data.results
        hideCategories();
    } catch {
        console.log(`Error occured: ${err}`);
            console.log(err.response)
    }
}

/* Game play functions */

// first step is to hide category div and replace w/ question div
function hideCategories() {
    console.log(triviaQuestions)
    console.log(triviaQuestions[0].correct_answer)
    console.log(triviaQuestions[0].incorrect_answers)
    categoryContainer.style.display = 'none'
    questionContainer.style.display = 'block'
    playGame();
}

// Loop through each object to push the correct_answer value and the incorrect_answer values into a new property for that object.
    // For multiple choice questions: each object has a key for correct_answer and a key for incorrect_answers which is another array.
function playGame() {
    let answerContainer = document.querySelector('#answer-container')

    let question = document.querySelector('#question')
    question.innerHTML = triviaQuestions[0].question

    let potentialAnswers = [];
    potentialAnswers.push(triviaQuestions[0].correct_answer)
    
    triviaQuestions[0].incorrect_answers.forEach(element => {
        potentialAnswers.push(element)
      });

    console.log(potentialAnswers)

    potentialAnswers.forEach(element => {
        let answerChoice = document.createElement('button')
        answerChoice.setAttribute('class', 'answer')
        answerChoice.innerHTML = `${element}`
        answerContainer.appendChild(answerChoice)
    })

}

// Create function to display each question from the array and display answer choices. Randomize array index (0, 1, 2, 3) to display answer choices in different order.

// Add event listener to answer choices. When clicked, store the answer in a new variable (userAnswer) and trigger function to evaluate the Answer

// Evaluate the userAnswer compared to the correct_answer. If the same, display a simple You're Right message. If not the same, display You're Incorrect message and the value of the correct_answer.
    // Pop or Splice the question out of the questionArray.
    // Decide whether or not to create a button to move to the next question OR a timer to move on automatically after 5 seconds.

// When the length of the questionArray is 0, the game is over. Final function will display and evaluate final score.
    // If user score is >= 9, display 'Expert' message
    // If user score is >= 5 && <= 8, display 'Intermediate' message
    // If user score is <=4, display 'Novice' message

// Add event Listener to "Reset Game" button that will clear all values (userScore, questionsArray, etc.) and prompt user to choose a category to get started.



