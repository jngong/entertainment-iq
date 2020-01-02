# Project Overview

## Project Name

Entertainment IQ

## Project Description

A one-player trivia game that allows users to test their entertainment knowledge in three categories: film, television and music. The app will fetch a random 12 questions and score based on number of correct answers. The game is over when a user has answered all 12 questions and will present an assessment of the user’s knowledge (e.g. Expert, Intermediate and Novice). 

## API and Data Sample

[Open Trivia DB](https://opentdb.com/api_config.php)

```JSON
{
    "response_code": 0,
    "results": [
        {
            "category": "Entertainment: Television",
            "type": "multiple",
            "difficulty": "easy",
            "question": "In the TV show &quot;Cheers&quot;, Sam Malone was a former relief pitcher for which baseball team?",
            "correct_answer": "Boston Red Sox",
            "incorrect_answers": [
                "New York Mets",
                "Baltimore Orioles",
                "Milwaukee Brewers"
            ]
        },
        {
            "category": "Entertainment: Television",
            "type": "multiple",
            "difficulty": "easy",
            "question": "In the TV show &#039;M*A*S*H&#039;, what was the nickname of Corporal Walter O&#039;Reilly?",
            "correct_answer": "Radar",
            "incorrect_answers": [
                "Hawkeye",
                "Hot Lips",
                "Trapper"
            ]
        }

```

## Wireframes

https://wireframe.cc/pro/pp/84310c826302744 

### MVP/PostMVP - 5min 

#### MVP 

- Allow user to choose a category (3 options)
- Display question and answer choices
- Track score - every correct answer is 1 point, every wrong answer earns 0 points
- Display correct answer if the user answered wrong
- Reset game option to start over


#### PostMVP 

- Implement session token to not repeat questions if restarted
- Local Storage to store questions and user answers
- More categories to choose from (e.g. Books, Video Games, Sports, etc.)
- Multi-player functionality - compete with another person
- Choose a new category for each question turn 


## Project Schedule

This schedule will be used to keep track of your progress throughout the week and align with our expectations.  

You are **responsible** for scheduling time with your squad to seek approval for each deliverable by the end of the corresponding day, excluding `Saturday` and `Sunday`.

|  Day | Deliverable | Status
|---|---| ---|
|Thursday, 1/2| Project plan; Project approval | In Progress
|Friday, 1/3| Pseudocode functionality; Core App Structure (HTML & CSS) | Incomplete
|Monday, 1/6| Code fetching questions from API and record user answers | Incomplete
|Tuesday, 1/7| Code functionality to track score; Code functionality to display final result | Incomplete
|Wednesday, 1/8| Completed MVP  | Incomplete
|Thursday, 1/9| Present | Incomplete


## Priority Matrix

Include a full list of features that have been prioritized based on the `Time and Importance` Matrix.  Link this image in a similar manner to your wireframes

## Timeframes

Tell us how long you anticipate spending on each area of development. Be sure to consider how many hours a day you plan to be coding and how many days you have available until presentation day.

## API Data Sample

Show us a snippet of JSON returned by your API so we know you can access it and get the info you need


Time frames are also key in the development cycle.  You have limited time to code all phases of the game.  Your estimates can then be used to evalute game possibilities based on time needed and the actual time you have before game must be submitted. It's always best to pad the time by a few hours so that you account for the unknown so add and additional hour or two to each component to play it safe.

| Component | Priority | Estimated Time | Time Invested | Actual Time |
| --- | :---: |  :---: | :---: | :---: |
| Adding Form | H | 3hrs| 3.5hrs | 3.5hrs |
| Working with API | H | 3hrs| 2.5hrs | 2.5hrs |
| Total | H | 6hrs| 5hrs | 5hrs |


## Code Snippet

Use this section to include a brief code snippet of functionality that you are proud of an a brief description  

```
function reverse(string) {
	// here is the code to reverse a string of text
}
```

## Change Log
 Use this section to document what changes were made and the reasoning behind those changes.  
