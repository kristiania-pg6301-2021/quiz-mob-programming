import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";


function Quiz() {
  const [quiz, setQuiz] = useState();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(async () => {
    const res = await fetch("/api/question");
    if (!res.ok) {
      console.log("error", res);
    }

    const question = await res.json();

    console.log(question);

    setQuiz(question);
  }, []);

  function handleClick(answerIndex) {
    if (answerIndex === quiz.indexOfRightAnswer) {
      alert("Correct answer");
    } else {
      alert("Wrong answer");
    }
  }

  async function doLogin(){
    let response

    try{
      response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({username, password}) 
      })
      if(response.status === 204){
        console.log("We're signed in")
      }
    }catch(e){
      console.log("Something went wrong", e)
    }

    setPassword("")
    setUsername("")
  }

  if (!quiz) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <h1>{quiz.question}</h1>
      {quiz.answers.map((a, index) => (
        <button onClick={() => handleClick(index)} key={index}>
          {a}
        </button>
      ))}

      <div>
        <input type="text" id="username" placeholder="username" onChange={(e) => setUsername(e.target.value)}/>
        <input type="password" id="password" placeholder="password" onChange={(e) => setPassword(e.target.value)}/>
        <button onClick={doLogin}>Log in</button>
      </div>
    </>
  );
}

ReactDOM.render(<Quiz />, document.getElementById("root"));
