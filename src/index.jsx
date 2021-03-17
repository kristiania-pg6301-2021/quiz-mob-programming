import React from 'react'
import ReactDOM from 'react-dom'
import {getQuiz} from "./getQuiz";


function Quiz() {
    
    function handleClick(answerIndex) {
        if(answerIndex === quiz.indexOfRightAnswer) {
            alert("Correct answer");
        } else {
            alert("Wrong answer");
        }
        
    }
    
    const quiz = getQuiz();
    return <>
    <h1>{quiz.question}</h1>
        {quiz.answers.map((a, index) => <button onClick={() => handleClick(index)}>{a}</button>)}
    </>
}

ReactDOM.render(<Quiz/>, document.getElementById("root"))