// Declare variable to track user score, initialize at 0
// Declare variable to track # questions remaining, initialize at 12

let userScore = 0;
let questionsRemaining = 12;
let triviaQuestions = [];

// To start the game, user chooses a category. Add event listeners to category buttons to trigger function for API call.
let filmButton = document.querySelector('#film')
let tvButton = document.querySelector('#tv')
let musicButton = document.querySelector('#music')

filmButton.addEventListener('click', filmQuestions)
tvButton.addEventListener('click', tvQuestions)
musicButton.addEventListener('click', musicQuestions)

async function filmQuestions() {
    try {
        let response = await axios.get(`https://opentdb.com/api.php?amount=12&type=multiple&category=11`)
        filmButton.removeEventListener('click', filmQuestions)
        tvButton.removeEventListener('click', tvQuestions)
        musicButton.removeEventListener('click', musicQuestions)
        console.log(response.data.results)
    } catch {
        console.log(`Error occured: ${err}`);
            console.log(err.response)

    }
}

async function tvQuestions() {
    try {
        let response = await axios.get(`https://opentdb.com/api.php?amount=12&type=multiple&category=14`)
        console.log(response.data.results) 
        filmButton.removeEventListener('click', filmQuestions)
        tvButton.removeEventListener('click', tvQuestions)
        musicButton.removeEventListener('click', musicQuestions)
    } catch {
        console.log(`Error occured: ${err}`);
            console.log(err.response)

    }
}

async function musicQuestions() {
    try {
        let response = await axios.get(`https://opentdb.com/api.php?amount=12&type=multiple&category=12`)
        console.log(response.data.results) 
        filmButton.removeEventListener('click', filmQuestions)
        tvButton.removeEventListener('click', tvQuestions)
        musicButton.removeEventListener('click', musicQuestions)
    } catch {
        console.log(`Error occured: ${err}`);
            console.log(err.response)

    }
}

// Create async await function for API call and parse JSON data into a Javascript Object i.e. questionArray = JSON.parse(). Object will contain 2 properties - the results key is an array of 12 objects. For multiple choice questions: each object has a key for correct_answer and a key for incorrect_answers which is another array.

// Loop through each object to push the correct_answer value and the incorrect_answer values into a new property for that object.

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



