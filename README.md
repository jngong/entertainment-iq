## Entertainment IQ

Deployed application: https://entertainment-iq.surge.sh/

**Entertainment IQ** is a one-player trivia game that allows users to test their entertainment knowledge in three categories: film, television and music. The app will fetch a random 12 questions and score based on number of correct answers. The game is over when a user has answered all 12 questions and will present an assessment of the user’s knowledge (e.g. Expert, Intermediate and Novice). 

It integrates data and questions from the [Open Trivia Database](https://opentdb.com/api_config.php).

## Code Showcase

Created a small animation to appear between questions that operates as a loading bar. Was my first time creating and implementing a CSS animation.

**CSS**
```
#loading-bar {
    display: none;
    width: 150px;
    height: 10px;
    margin: 10px auto;
    background-color: #fff;
    border-radius: 3px;
    transform-origin: left center;
    background: linear-gradient(to right, #65A5D6, #23394A);
}

@keyframes load-question {
    0% { 
        transform: scaleX(0);
    }
    100% { 
        transform: scaleX(1);
    }
}
```
**JS**
```
setTimeout(() => {
    loadingBar.style.display = 'block'
    loadingBar.style.animation = '3s linear 0s load-question'
}, 1500)
```
<br>

## Wireframes

https://wireframe.cc/pro/pp/84310c826302744 

#### MVP Goals

- Allow user to choose a category (3 options)
- Display question and answer choices
- Track score - every correct answer is 1 point, every wrong answer earns 0 points
- Display correct answer if the user answered wrong
- Reset game option to start over

#### Post-MVP Goals

- Implement session token to not repeat questions if restarted
- Local Storage to store questions and user answers
- More categories to choose from (e.g. Books, Video Games, Sports, etc.)
- Multi-player functionality - compete with another person
- Choose a new category for each question turn 
