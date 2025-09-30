import { useState } from "react";

import lightNavbarIcon from "../public/favicon-light.png";
import darkNavbarIcon from "../public/favicon-dark.png";
import addIcon from "./assets/icons/icon-add.svg";
import clearIcon from "./assets/icons/icon-clear.svg";
import deleteIcon from "./assets/icons/icon-delete.svg";
import checkIcon from "./assets/icons/icon-check.svg";
import checkedIcon from "./assets/icons/icon-checked.svg";

function Todo() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  function handleValue(e) {
    setInput(e.target.value);
  }

  function handleDelete(id) {
    const deletedTodo = todos.filter((todo) => todo.id !== id);
    setTodos(deletedTodo);
  }

  function handleCheck(id) {
    const update = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(update);
  }

  function addTask() {
    if (!input.trim()) return;
    const newTask = {
      id: crypto.randomUUID(),
      text: input,
      completed: false,
    };
    setTodos((prev) => [...prev, newTask]);
    setInput("");
  }

  return (
    <div className="">
      <header>
        <nav className="">
          <a href="/">
            <img src={lightNavbarIcon} alt="Home" className="w-[30px]" />
          </a>
          <h1>Todo App</h1>
        </nav>
      </header>
      <main>
        <form className="" onSubmit={(e) => e.preventDefault()}>
          <label
            htmlFor="todo-input"
            className="absolute w-[1px] h-[1px] p-0 m-[-1px] overflow-hidden whitespace-wrap border-0"
          >
            Write a todo:
          </label>
          <input
            type="text"
            name="todo-input"
            id="todo-input"
            placeholder="e.g, Buy groceries"
            className=""
            value={input}
            onChange={handleValue}
          />
          <button aria-label="Add task" type="button" onClick={addTask}>
            <img src={addIcon} className="" />
          </button>
          <button
            aria-label="Clear all tasks"
            type="reset"
            onClick={() => setTodos([])}
          >
            <img src={clearIcon} className="" />
          </button>
        </form>
        <ul className="tasks-container">
          {todos.map((todo) => {
            return (
              <li className="" key={todo.id}>
                <span className="">{todo.text}</span>

                <button
                  aria-label="Delete this task"
                  type="button"
                  onClick={() => handleDelete(todo.id)}
                >
                  <img src={deleteIcon} alt="" className="" />
                </button>
                <button
                  aria-label="Mark task as done"
                  type="button"
                  onClick={() => handleCheck(todo.id)}
                >
                  <img
                    src={!todo.completed ? checkIcon : checkedIcon}
                    alt=""
                    className=""
                  />
                </button>
              </li>
            );
          })}
        </ul>
      </main>
    </div>
  );
}

export default Todo;
