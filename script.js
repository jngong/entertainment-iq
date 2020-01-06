let userScore = 0; // Track user score
let questionsPlayed = 0;
let questionsRemaining = 12; // Track # questions remaining
let triviaQuestions = []; // Store array of questions from API
let category

// Store DOM elements
let filmButton = document.querySelector('#film')
let tvButton = document.querySelector('#tv')
let musicButton = document.querySelector('#music')
let categoryContainer = document.querySelector('.category-container')
let questionContainer = document.querySelector('.question-container')
let introParagraph = document.querySelector('header > p')
let scoreContainer = document.querySelector('.score-container')
let resetButton = document.querySelector('#reset-game')

// Event listeners
filmButton.addEventListener('click', filmQuestions)
tvButton.addEventListener('click', tvQuestions)
musicButton.addEventListener('click', musicQuestions)
resetButton.addEventListener('click', resetGame)

// Async functions to pull API data based on category button clicked.
async function filmQuestions() {
    try {
        let response = await axios.get(`https://opentdb.com/api.php?amount=12&type=multiple&category=11`)
        triviaQuestions = response.data.results
        category = 'movies'
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
        category = 'TV'
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
        category = 'music'
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

//reset game function 
function resetGame() {
    categoryContainer.style.display = 'flex'
    questionContainer.style.display = 'none'
    introParagraph.style.display = 'block'
    scoreContainer.style.display = 'none'
    
    scoreContainer.innerHTML = `<h2>Your Score</h2>
    <p id='score'>0 / 0</p>
    <p>You have <span id='questions-remaining'>12</span> questions remaining</p>`
    
    userScore = 0
    category = ''
    questionsPlayed = 0
    questionsRemaining = 12
    triviaQuestions = []
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

        // function to evaluate and display final score. Called in nextQuestion function
    function finalScore() {
        scoreContainer.style.display = 'none'
        if (userScore >= 9) {
            console.log(`Game over. User is an expert`)
            question.innerHTML = `<p>Your final score is ${userScore}.</p><p id='final-message'>Congratulations! You are an expert in obscure facts about ${category}. You win bragging rights!</p>`
        } else if (userScore <= 4) {
            console.log(`Game over. User is a beginner.`)
            question.innerHTML = `<p>Your final score is ${userScore}.</p><p id='final-message'>:( Looks like you need to study up on your ${category} facts and try again later.</p>`
        } else {
            console.log(`Game over. User has intermediate knowledge.`)
            question.innerHTML = `<p>Your final score is ${userScore}.</p><p id='final-message'>Nice work! You have some solid knowledge about ${category}, but don't win the top prize.</p>`
        }
    }

    function nextQuestion() {
        answerContainer.innerHTML = ''
        message.innerHTML = ''     
        if (triviaQuestions.length > 0) {
         displayQuestion(triviaQuestions.length - 1)        
            
        } else {
            finalScore();
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
                message.innerHTML = `Nice job! You're correct.`
                this.style.backgroundColor = 'green'
                this.style.color = 'white'
                
                userScore++
                questionsPlayed++
                questionsRemaining--
                
                triviaQuestions.pop();

                console.log(`Correct. User clicked: ${userAnswer}. Correct answer: ${correctAnswer}.`)
            } else {
                message.innerHTML = `Sorry. Wrong answer.`

                this.style.backgroundColor = 'red'
                this.style.color = 'white'
                
                let correctButton = document.querySelector('.correct-answer')
                
                setTimeout(showCorrect, 1000)
                function showCorrect(){ 
                    correctButton.style.backgroundColor = 'green'
                    correctButton.style.color = 'white'
                    correctButton.style.transform = 'scale(1.1)'
                }
                
                questionsPlayed++
                questionsRemaining--
                
                triviaQuestions.pop();

                console.log(`Wrong. User clicked: ${userAnswer}. Correct answer: ${correctAnswer}.`)
            }
            console.log(`Current score: ${userScore} / ${questionsPlayed}, Qs remaining: ${questionsRemaining}`);

            displayScore();
            setTimeout(nextQuestion, 3000); 
        }

        function displayScore() {
            let scoreDisplay = document.querySelector('#score')
            let numberQuestionsLeft = document.querySelector('#questions-remaining')

            scoreDisplay.innerHTML = ``
            scoreDisplay.innerHTML = `${userScore} / ${questionsPlayed}`
            
            numberQuestionsLeft.innerHTML = ``
            numberQuestionsLeft.innerHTML = `${questionsRemaining}`
        }
    }

    nextQuestion();  
    
}

    // Using a timer to move to the next question (setTimeout), add an animation/transition as a visual indicator of the next question




