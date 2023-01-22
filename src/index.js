import React, { useState, useReducer, useContext } from "react";
import ReactDOM from "react-dom";
import joinable from "joinable";

import {
  toDoReducer,
  initialState,
  addAction,
  markAction,
  deleteAction
} from "./todo";
import { PostLinK } from "./post-linK";

import "./styles.css";

const TodosContext = React.createContext(null);

function App() {
  const [todoList, dispatch] = useReducer(toDoReducer, initialState);
  return (
    <TodosContext.Provider value={dispatch}>
      <div className="App">
        <PostLinK />
        <InputTask />
        <h3>Tasks</h3>
        <TaskList tasks={todoList} />
      </div>
    </TodosContext.Provider>
  );
}

const InputTask = React.memo(function TaskForm() {
  const [task, setTask] = useState("");
  const dispatch = useContext(TodosContext);

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(addAction(task));
    setTask("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <p>
        <input
          type="text"
          name="task"
          className="add-task"
          onChange={e => {
            setTask(e.target.value);
          }}
          autoComplete="off"
          value={task}
          placeholder="Add a task"
        />
        <button className="baseButton add" type="submit">
          Add
        </button>
      </p>
    </form>
  );
});

function TaskList({ tasks }) {
  return (
    <ol>
      {tasks.map((task, i) => {
        return (
          <li key={i}>
            <span className={joinable([task.done, "cross-out"])}>
              {task.name}
            </span>{" "}
            {!task.done && (
              <Action
                id={i}
                className="baseButton done"
                action={markWith(true)}
              >
                Done
              </Action>
            )}
            {task.done && (
              <Action
                id={i}
                className="baseButton undo"
                action={markWith(false)}
              >
                Undo
              </Action>
            )}
            <Action id={i} className="baseButton delete" action={deleteAction}>
              Delete
            </Action>
          </li>
        );
      })}
    </ol>
  );
}

function markWith(mark) {
  return id => markAction(id, mark);
}

function Action({ id, className, action, children }) {
  const dispatch = useContext(TodosContext);
  return (
    <button
      className={className}
      onClick={() => {
        dispatch(action(id));
      }}
    >
      {children}
    </button>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
