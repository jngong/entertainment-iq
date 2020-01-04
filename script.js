let userScore = 0; // Track user score
let questionsRemaining = 12; // Track # questions remaining
let triviaQuestions = []; // Store array of questions from API

// Store DOM elements
let filmButton = document.querySelector('#film')
let tvButton = document.querySelector('#tv')
let musicButton = document.querySelector('#music')
let categoryContainer = document.querySelector('.category-container')
let questionContainer = document.querySelector('.question-container')
let introParagraph = document.querySelector('header > p')
let scoreContainer = document.querySelector('.score-container')

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
    categoryContainer.style.display = 'none'
    questionContainer.style.display = 'block'
    introParagraph.style.display = 'none'
    scoreContainer.style.display = 'block'
    playGame();
}

// For multiple choice questions: each object has a key for correct_answer and a key for incorrect_answers which is another array.
function playGame() {
    console.log(triviaQuestions)
    
    let answerContainer = document.querySelector('#answer-container')
    let question = document.querySelector('#question')
    let message = document.querySelector('#question-message')
    
        // Loop through each object to push the correct_answer value and the incorrect_answer values into a new property for that object.
    for (let i = 0; i < triviaQuestions.length; i++) {
        
        let potentialAnswers = [];
        potentialAnswers.push(triviaQuestions[i].correct_answer)
        triviaQuestions[i].incorrect_answers.forEach(element => {
            potentialAnswers.push(element)
        });

        // randomize the potentialAnswers array. sourced solution: https://medium.com/@fyoiza/how-to-randomize-an-array-in-javascript-8505942e452
        let randomizedAnswers = []
        while(potentialAnswers.length !== 0) {
            let randomIndex = Math.floor(Math.random() * potentialAnswers.length);
            randomizedAnswers.push(potentialAnswers[randomIndex]);
            potentialAnswers.splice(randomIndex, 1)
        }
        
        triviaQuestions[i].all_answers = randomizedAnswers; 
    }

    function nextQuestion() {
        answerContainer.innerHTML = ''
        message.innerHTML = ''     
        if (triviaQuestions.length > 0) {
         displayQuestion(triviaQuestions.length - 1)        
            
        } else {
            console.log('game over')
            question.innerHTML = 'Game Over'
        }
    }
    
    function displayQuestion(i) {
        question.innerHTML = triviaQuestions[i].question
        let answerOptions = triviaQuestions[i].all_answers

        console.log(`Q${i+1}: ${triviaQuestions[i].question}`)
        console.log(answerOptions)

        answerOptions.forEach(element => {
            let answerChoice = document.createElement('button')
            answerChoice.setAttribute('class', 'answer')
            answerChoice.innerHTML = `${element}`

            if (element === triviaQuestions[i].correct_answer) {
                answerChoice.classList.add('correct-answer')
            }

            answerContainer.appendChild(answerChoice)
            answerChoice.addEventListener('click', checkAnswer)
        })

            //checkAnswer funtion takes the index value as an argument and checks that the userAnswer is the same as the correct answer for that question
        function checkAnswer() {
            let userAnswer = this.innerHTML;
            let correctAnswer = triviaQuestions[i].correct_answer
    
            if (userAnswer == correctAnswer) {
                console.log(`Correct. User clicked: ${userAnswer}. Correct answer is: ${correctAnswer}. Incorrect answers: ${triviaQuestions[i].incorrect_answers}.`)
                message.innerHTML = `Nice job! You're correct.`
                this.style.backgroundColor = 'green'
                triviaQuestions.pop();
            } else {
                let correctButton = document.querySelector('.correct-answer')
                console.log(`Wrong. User clicked: ${userAnswer}. Correct answer is: ${correctAnswer}. Incorrect answers: ${triviaQuestions[i].incorrect_answers}.`)
                message.innerHTML = `Sorry. Wrong answer. <br>The correct answer is ${correctAnswer}.`
                correctButton.style.backgroundColor = 'green'
                this.style.backgroundColor = 'red'
                triviaQuestions.pop();
            }
            setTimeout(nextQuestion, 3000); 
        }
    }

    nextQuestion();  
    
}

    // Using a timer to move to the next question (setTimeout), add an animation/transition as a visual indicator of the next question

// When the length of the questionArray is 0, the game is over. Final function will display and evaluate final score.
    // If user score is >= 9, display 'Expert' message
    // If user score is >= 5 && <= 8, display 'Intermediate' message
    // If user score is <=4, display 'Novice' message

// Add event Listener to "Reset Game" button that will clear all values (userScore, questionsArray, etc.) and prompt user to choose a category to get started.



