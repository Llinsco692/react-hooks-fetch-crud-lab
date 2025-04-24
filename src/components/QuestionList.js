import React, { useEffect, useState } from "react";

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    let isMounted = true;

    fetch("http://localhost:4000/questions")
      .then((response) => response.json())
      .then((data) => {
        if (isMounted) setQuestions(data);
      });

    return () => {
      isMounted = false; // Cleanup function to prevent state updates on unmounted components
    };
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    }).then(() => {
      setQuestions((prevQuestions) =>
        prevQuestions.filter((question) => question.id !== id)
      );
    });
  };

  const handleCorrectAnswerChange = (id, correctIndex) => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex }),
    }).then(() => {
      setQuestions((prevQuestions) =>
        prevQuestions.map((question) =>
          question.id === id ? { ...question, correctIndex } : question
        )
      );
    });
  };

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map((question) => (
          <li key={question.id}>
            <h2>{question.question}</h2>
            <ul>
              {question.answers.map((answer, index) => (
                <li key={index}>{answer}</li>
              ))}
            </ul>
            <label htmlFor={`correct-answer-${question.id}`}>
              Correct Answer:
            </label>
            <select
              id={`correct-answer-${question.id}`}
              value={question.correctIndex}
              onChange={(e) =>
                handleCorrectAnswerChange(question.id, parseInt(e.target.value))
              }
              data-testid={`dropdown-${question.id}`} // Add test ID for easier querying
            >
              {question.answers.map((answer, index) => (
                <option key={index} value={index}>
                  {answer}
                </option>
              ))}
            </select>
            <button onClick={() => handleDelete(question.id)}>
              Delete Question
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;
