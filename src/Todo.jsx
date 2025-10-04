import { useState, useEffect } from "react";

import lightNavbarIcon from "../public/favicon-light.png";
import addIcon from "./assets/icons/icon-add.svg";
import clearIcon from "./assets/icons/icon-clear.svg";
import deleteIcon from "./assets/icons/icon-delete.svg";
import checkIcon from "./assets/icons/icon-check.svg";
import checkedIcon from "./assets/icons/icon-checked.svg";

function Todo() {
  const [todos, setTodos] = useState(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    return storedTodos ? storedTodos : [];
  });
  const [todoInput, setTodoInput] = useState("");
  const [dateInput, setDateInput] = useState("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function handleTodoInput(event) {
    setTodoInput(event.target.value);
  }

  function handleDateInput(event) {
    setDateInput(event.target.value);
  }

  function addTodo() {
    if (!todoInput.trim() && !dateInput.trim()) {
      alert("Please fill out the forms! Thank you.");
      return;
    } else if (!todoInput.trim()) {
      alert("Please type a task!");
      return;
    } else if (!dateInput.trim()) {
      alert("Please insert a date!");
      return;
    }

    const newTask = {
      id: crypto.randomUUID(),
      text: todoInput,
      date: dateInput,
      completed: false,
    };
    setTodos((prev) => [...prev, newTask]);
    setTodoInput("");
    setDateInput("");
  }

  function clearTodos() {
    setTodos([]);
  }

  function deleteTodo(id) {
    const filteredTodos = todos.filter((todo) => todo.id !== id);
    setTodos(filteredTodos);
  }

  function checkTodo(id) {
    const updated = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updated);
  }

  console.log(todoInput, dateInput);

  return (
    <div className="h-screen flex pt-20 justify-center text-amber-950">
      <div className="wrapper bg-amber-500 h-fit p-10 pt-8 rounded-2xl flex flex-col gap-4">
        <header>
          <nav className="flex items-center gap-4 w-fit">
            <a href="#">
              <img src={lightNavbarIcon} alt="Home" className="w-[100px]" />
            </a>
            <h1 className="text-3xl font-semibold">Todo App</h1>
          </nav>
        </header>
        <main className="flex flex-col items-center gap-5">
          <form
            className="flex gap-x-5 items-center"
            onSubmit={(e) => e.preventDefault()}
          >
            <label
              htmlFor="text-input"
              className="absolute size-[1px] p-0 m-[-1px] overflow-hidden whitespace-wrap border-0"
            >
              Write a todo
            </label>
            <input
              type="text"
              id="text-input"
              name="text-input"
              placeholder="e.g, Buy groceries"
              className="py-1 px-2 border-0 outline-2 rounded-sm focus:outline-amber-800"
              value={todoInput}
              onChange={handleTodoInput}
            />
            <label
              htmlFor="date-input"
              className="absolute size-[1px] p-0 m-[-1px] overflow-hidden whitespace-wrap border-0"
            >
              Insert a date
            </label>
            <input
              type="date"
              name="date-input"
              id="date-input"
              className="py-1 px-2 border-0 outline-2 rounded-sm focus:outline-amber-800"
              value={dateInput}
              onChange={handleDateInput}
            />
            <button
              type="button"
              aria-label="Add Task"
              className="bg-amber-900 px-4 py-1.5 rounded-2xl cursor-pointer"
              onClick={addTodo}
              title="Add task"
            >
              <img src={addIcon} alt="" />
            </button>
            <button
              type="button"
              aria-label="Clear all tasks"
              className="bg-amber-900 px-4 py-1.5 rounded-2xl cursor-pointer "
              onClick={clearTodos}
              title="Clear all tasks"
            >
              <img src={clearIcon} alt="" />
            </button>
          </form>
          <div id="error-message"></div>
          <ul className="flex flex-col gap-2">
            {todos.map((todo) => {
              return (
                <li
                  className="flex justify-between items-center text-white font-medium gap-10 bg-amber-700 py-3 px-5 rounded-lg min-w-132"
                  key={todo.id}
                >
                  <div className="grid">
                    <span
                      className={
                        todo.completed
                          ? "line-through decoration-2 text-amber-300 decoration-amber-50"
                          : "text-amber-300"
                      }
                    >
                      {todo.text}
                    </span>
                    <span>{todo.date}</span>
                  </div>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      aria-label="Delete task"
                      className="bg-amber-900 px-4 py-1.5 rounded-2xl cursor-pointer"
                      onClick={() => deleteTodo(todo.id)}
                      title="Delete task"
                    >
                      <img src={deleteIcon} alt="" />
                    </button>
                    <button
                      type="button"
                      aria-label="Mark task as done"
                      className="bg-amber-900 px-4 py-1.5 rounded-2xl cursor-pointer"
                      onClick={() => checkTodo(todo.id)}
                      title="Mark as done"
                    >
                      <img
                        src={todo.completed ? checkedIcon : checkIcon}
                        alt=""
                      />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </main>
      </div>
    </div>
  );
}

export default Todo;
