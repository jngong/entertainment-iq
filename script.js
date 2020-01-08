let userScore = 0; // Track user score
let questionsPlayed = 0;
let questionsRemaining = 12; // Track # questions remaining
let triviaQuestions = []; // Store array of questions from API
let category;
let sessionToken;

// Store DOM elements
let filmButton = document.querySelector('#film')
let tvButton = document.querySelector('#tv')
let musicButton = document.querySelector('#music')
let categoryContainer = document.querySelector('.category-container')
let questionContainer = document.querySelector('.question-container')
let introParagraph = document.querySelector('header > p')
let scoreContainer = document.querySelector('.score-container')
let resetButton = document.querySelector('#reset-game')
let loadingBar = document.querySelector('#loading-bar')

// Event listeners
filmButton.addEventListener('click', filmQuestions)
tvButton.addEventListener('click', tvQuestions)
musicButton.addEventListener('click', musicQuestions)
resetButton.addEventListener('click', resetGame)

// Async function to retrieve and set a session token
if (sessionStorage.getItem('token') === null) {
    async function retrieveToken() {
        try {
            let response = await axios.get(`https://opentdb.com/api_token.php?command=request`)
            sessionToken = response.data.token
            console.log(response)
            console.log(sessionToken)
            
            sessionStorage.setItem('token', sessionToken)
        } catch {
            console.log(`Error occured: ${err}`);
            console.log(err.response)
        }
    }
    retrieveToken();
} else {
    sessionToken = sessionStorage.getItem('token')
    console.log(sessionToken)
}

// Async functions to pull API data based on category button clicked.
async function filmQuestions() {
    try {
        let response = await axios.get(`https://opentdb.com/api.php?amount=12&category=11&token=${sessionToken}`)
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
        let response = await axios.get(`https://opentdb.com/api.php?amount=12&category=14&&token=${sessionToken}`)
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
        let response = await axios.get(`https://opentdb.com/api.php?amount=12&category=12&token=${sessionToken}`)
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
    questionContainer.style.display = 'flex'
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
        
        //change HTML entities to plain text to compare correct answers. Solution sourced from: https://gomakethings.com/decoding-html-entities-with-vanilla-javascript/
        let decodeHTML = function(html) {
            var txt = document.createElement('textarea');
            txt.innerHTML = html;
            return txt.value;
        };

        let decodedAnswer = decodeHTML(`${triviaQuestions[i].correct_answer}`);
        console.log(`Q${i + 1}: ${decodedAnswer}`)
        triviaQuestions[i].correct_answer = decodedAnswer

        let potentialAnswers = [];
        potentialAnswers.push(decodedAnswer)
        triviaQuestions[i].incorrect_answers.forEach(element => {
            potentialAnswers.push(element)
        });
        
        if (triviaQuestions[i].type === 'multiple') {
            // randomize the potentialAnswers array. sourced solution: https://medium.com/@fyoiza/how-to-randomize-an-array-in-javascript-8505942e452
            let randomizedAnswers = []
            while(potentialAnswers.length !== 0) {
                let randomIndex = Math.floor(Math.random() * potentialAnswers.length);
                randomizedAnswers.push(potentialAnswers[randomIndex]);
                potentialAnswers.splice(randomIndex, 1)
            }            
            triviaQuestions[i].all_answers = randomizedAnswers; 
        } else if (triviaQuestions[i].type === 'boolean') {
            triviaQuestions[i].all_answers = ['True', 'False']
        }
    }

        // function to evaluate and display final score. Called in nextQuestion function
    function finalScore() {
        scoreContainer.style.display = 'none'
        if (userScore === 12) { 
            console.log(`Game over. Score is 12.`)
            question.innerHTML = `<p>Your final score is ${userScore}.</p><p id='final-message'>Wow, a perfect score! You are the master of obscure facts about ${category}. You win bragging rights :)</p>`
        } else if (userScore === 0) {
            console.log(`Game over. Score is 0.`)
            question.innerHTML = `<p>Your final score is ${userScore}.</p><p id='final-message'>You got them ALL wrong :( Maybe take some time to study up on ${category} and try again some other time.</p>`
        } else if (userScore >= 9) {
            console.log(`Game over. User is an expert`)
            question.innerHTML = `<p>Your final score is ${userScore}.</p><p id='final-message'>Congratulations! You are an expert in obscure facts about ${category}. You win bragging rights :)</p>`
        } else if (userScore <= 4) {
            console.log(`Game over. User is a beginner.`)
            question.innerHTML = `<p>Your final score is ${userScore}.</p><p id='final-message'>Better luck next time! Looks like you need to study up on ${category} and try again later.</p>`
        } else {
            console.log(`Game over. User has intermediate knowledge.`)
            question.innerHTML = `<p>Your final score is ${userScore}.</p><p id='final-message'>Nice work! You have some solid knowledge about ${category}, but don't win the top prize.</p>`
        }
    }

    function nextQuestion() {
        loadingBar.style.display = 'none'
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
                this.style.backgroundColor = '#2D8031'
                this.style.color = '#ffffff'
                this.style.boxShadow = '2px 6px #47CC4E'
                // message.innerHTML = `Nice job! You're correct.`
                
                userScore++
                questionsPlayed++
                questionsRemaining--
                
                triviaQuestions.pop();

                setTimeout(function() {
                    loadingBar.style.display = 'block'
                    loadingBar.style.animation = '3.5s linear 0s load-question'
                }, 500) 
                
                console.log(`Correct. User clicked: ${userAnswer}. Correct answer: ${correctAnswer}.`)
            } else {
                this.style.backgroundColor = '#BD201C'
                this.style.color = '#ffffff'
                this.style.boxShadow = '2px 6px #E82623'
                // message.innerHTML = `Sorry. Wrong answer.`
                
                let correctButton = document.querySelector('.correct-answer')
                
                setTimeout(showCorrect, 1000)
                setTimeout(() => {
                    loadingBar.style.display = 'block'
                    loadingBar.style.animation = '3s linear 0s load-question'
                }, 1500)
                function showCorrect(){ 
                    correctButton.style.backgroundColor = '#2D8031'
                    correctButton.style.color = '#ffffff'
                    correctButton.style.transform = 'scale(1.1)'
                    correctButton.style.boxShadow = '2px 6px #47CC4E'
                }
                
                questionsPlayed++
                questionsRemaining--
                
                triviaQuestions.pop();

                console.log(`Wrong. User clicked: ${userAnswer}. Correct answer: ${correctAnswer}.`)

                // loadingBar.style.animationDelay = '2s'

            }
            console.log(`Current score: ${userScore} / ${questionsPlayed}, Qs remaining: ${questionsRemaining}`);

            displayScore();
            setTimeout(nextQuestion, 4000);

            // loadingBar.style.display = 'block'
            // loadingBar.style.animation = '3s linear 2s load-question'
            // loadingBar.style.animationName = 'load-question'
            // loadingBar.style.animationDuration = '3s'
            // loadingBar.style.timingFunction = 'ease-in'

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
