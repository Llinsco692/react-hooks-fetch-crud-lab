# Putting it All Together: React Fetch CRUD Lab

## Learning Goals

- Use the `useEffect` hook to fetch data from an API
- Use event handlers with `fetch` to send data to an API
- Update state after receiving data from an API

## Introduction

We're going to continue working on our quiz app, this time from the
administrative side of things! We want our quizmasters to be able to view, add,
edit, and delete the existing quizzes so they can change the content for the
rest of our users.

There's some starter code set up, so you won't need to create any new components
for this lab. Your goal will be to work with `fetch` and interact with our quiz
API to perform the necessary CRUD operations to complete these deliverables.

## Setup

1. Run `npm install` to install the necessary dependencies.
2. Start the `json-server` by running `npm run server` (the command is in the `package.json` file).  
   Once your server is running, go to `http://localhost:4000/questions` in your browser to view the question data.
3. In a new terminal tab, run `npm start` to start the React application.

## Deliverables

### GET /questions

When the application loads, fetch all the questions from
`http://localhost:4000/questions` and display them using the `QuestionList`
component.

You'll need to use `useState` and `useEffect` for this deliverable. Decide where
to place them based on which components need access to the question data.

### POST /questions

When the user clicks the 'New Question' button, a form will be displayed for
creating a new question. This form is already set up as a controlled form, so
your responsibility will be to send this form data to the API _when the form is
submitted_.

Format your POST request as follows:

```txt
POST /questions

Required Headers:
{ "Content-Type": "application/json" }

Body:
{
  "prompt": string,
  "answers": array of strings,
  "correctIndex": integer
}
```

After successfully adding the new question to the server, update the state to
display the new question in the `QuestionList` component.

**NOTE**: If you send the body of your request in the wrong format, you'll need
to manually delete the invalid entry from the `db.json` file.

### DELETE /questions/:id

When the user clicks the 'View Questions' button, a list of all the questions
should be displayed (from deliverable 1). _When the delete button is clicked_,
remove the question from the list by updating state and delete it from the
server.

Include the **id** of the question you're trying to delete in your request's URL.

### PATCH /questions/:id

When the user clicks the 'View Questions' button, a list of all the questions
should be displayed (from deliverable 1). _When the dropdown for the correct
answer is changed_, update the question on the server and in state.

Format your PATCH request as follows:

```txt
PATCH /questions/:id

Required Headers:
{ "Content-Type": "application/json" }

Body:
{
  "correctIndex": integer
}
```

Include the **id** of the question you're trying to update in your request's URL.

## Resources

- [Using `fetch`](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
- [React `fetch` with `useEffect` Example][react ajax]
- [React State and Arrays](https://github.com/learn-co-curriculum/react-hooks-state-arrays)

[react ajax]: https://reactjs.org/docs/faq-ajax.html#example-using-ajax-results-to-set-local-state
