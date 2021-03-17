import React, {useEffect} from 'react'
import ReactDOM from 'react-dom'
import {getQuiz} from "./getQuiz";


function Quiz() {
    useEffect(async () => {
        const res = await fetch("/api/question");
        if (!res.ok) {
            console.log("error", res)
        }

        const question = await res.json()
        console.log(question)

    })
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