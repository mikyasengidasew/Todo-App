import { useState, useEffect } from "react";

import lightNavbarIcon from "../public/favicon-light.png";
import addIcon from "./assets/icons/icon-add.svg";
import addIconWhite from "./assets/icons/icon-add-white.svg";
import clearIcon from "./assets/icons/icon-clear.svg";
import clearIconWhite from "./assets/icons/icon-clear-white.svg";
import deleteIcon from "./assets/icons/icon-delete.svg";
import deleteIconWhite from "./assets/icons/icon-delete-white.svg";
import checkIcon from "./assets/icons/icon-check.svg";
import checkIconWhite from "./assets/icons/icon-check-white.svg";
import checkedIcon from "./assets/icons/icon-checked.svg";
import checkedIconWhite from "./assets/icons/icon-checked-white.svg";

function Todo() {
  const [formData, setFormData] = useState({
    text: "",
    date: "",
    time: "",
  });
  const [todos, setTodos] = useState([]);

  const addTodos = () => {
    if (
      !formData.text.trim() &&
      !formData.date.trim() &&
      !formData.time.trim()
    ) {
      alert("Please fill out the forms!");
      return;
    } else if (!formData.text.trim()) {
      alert("Please enter a task!");
      return;
    } else if (!formData.date.trim()) {
      alert("Please insert the date!");
      return;
    } else if (!formData.time.trim()) {
      alert("Please insert the time!");
      return;
    }

    const todoItem = {
      id: crypto.randomUUID(),
      completed: false,
      text: formData.text,
      date: formData.date,
      time: formData.time,
    };
    setTodos((prev) => [...prev, todoItem]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(e);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="h-svh flex items-center justify-center">
      <div className="h-fit flex flex-col gap-10">
        <header>
          <nav className="flex items-center gap-5">
            <a href="#">
              <img src={lightNavbarIcon} alt="Home" className="w-[75px]" />
            </a>
            <h1 className="text-5xl font-bold ">Todo App</h1>
          </nav>
        </header>
        <main className="grid gap-3">
          <form
            className="grid gap-5 justify-items-center bg-blue-500 p-5 rounded-lg drop-shadow-xl drop-shadow-blue-500/60"
            onSubmit={handleSubmit}
          >
            <fieldset className="flex gap-5">
              <label
                htmlFor="text-input"
                className="absolute size-[1px] p-0 m-[-1px] overflow-hidden whitespace-wrap border-0"
              >
                Write a todo
              </label>
              <input
                className="outline-2 border-0 outline-blue-600 pl-3 p-2 pb-3 rounded-lg text-white
                hover:outline-3 focus:outline-blue-700 focus:outline-3"
                type="text"
                id="text-input"
                name="text"
                placeholder="e.g, Buy groceries"
                value={formData.text}
                onChange={handleChange}
              />
              <label
                htmlFor="date-input"
                className="absolute size-[1px] p-0 m-[-1px] overflow-hidden whitespace-wrap border-0"
              >
                Insert a date
              </label>
              <input
                className="outline-2 border-0 outline-blue-600 pl-3 pb-0.5 pr-2 rounded-lg cursor-pointer text-white hover:outline-3 focus:outline-blue-700 focus:outline-3"
                type="date"
                id="date-input"
                name="date"
                value={formData.date}
                onChange={handleChange}
              />
              <label
                htmlFor="time-input"
                className="absolute size-[1px] p-0 m-[-1px] overflow-hidden whitespace-wrap border-0"
              >
                Insert a time period
              </label>
              <input
                className="outline-2 border-0 outline-blue-600 pl-3 pr-2 rounded-lg cursor-pointer text-white hover:outline-3 focus:outline-blue-700 focus:outline-3"
                type="time"
                id="time-input"
                name="time"
                value={formData.time}
                onChange={handleChange}
              />
            </fieldset>
            <fieldset className="w-full flex gap-5">
              <button
                className="flex justify-center gap-2 bg-blue-500/90 px-3 pr-6 py-3 rounded-lg font-semibold text-white cursor-pointer drop-shadow-blue-600 drop-shadow-md transition-all ease-in-out duration-400 hover:bg-blue-500 hover:drop-shadow-blue-700 hover:drop-shadow-lg"
                type="submit"
                aria-label="Add Task"
                title="Add task"
                onClick={addTodos}
              >
                <img src={addIconWhite} alt="" />
                <span>Add Task</span>
              </button>
              <button
                className="flex justify-center gap-2 bg-blue-500/90 px-3 pr-4 py-3 rounded-lg font-semibold text-white cursor-pointer drop-shadow-blue-600 drop-shadow-md transition-all ease-in-out duration-400 hover:bg-blue-500 hover:drop-shadow-blue-700 hover:drop-shadow-lg"
                type="button"
                aria-label="Clear all tasks"
                title="Clear all tasks"
              >
                <img src={clearIconWhite} alt="" />
                <span>Clear Tasks</span>
              </button>
            </fieldset>
          </form>
          <div id="error-message"></div>
          <ul className="grid gap-3 bg-blue-500 text-white p-3 rounded-lg drop-shadow-xl drop-shadow-blue-300">
            {todos.map((todo) => {
              return (
                <li
                  className="flex justify-between items-center p-2 bg-blue-600 rounded-lg cursor-pointer transition-all ease-in-out duration-100 hover:translate-x-[.5px] hover:translate-y-[-.5px]"
                  key={todo.id}
                >
                  <div className="grid">
                    <span className="font-semibold text-lg">{todo.text}</span>
                    <span className="">{todo.date}</span>
                    <span className="font-medium">
                      {/* Link this at to the time input field */}
                      <label
                        htmlFor="time-input"
                        className="text-[1.3rem] cursor-pointer"
                      >
                        @
                      </label>{" "}
                      {todo.time}
                    </span>
                  </div>
                  <div className="grid gap-2">
                    <button
                      className="px-5 py-2 rounded-full bg-red-600/65 cursor-pointer  transition-all ease-in-out duration-200 hover:bg-red-600"
                      type="button"
                      aria-label="Delete task"
                      title="Delete task"
                    >
                      <img src={deleteIconWhite} alt="" />
                    </button>
                    <button
                      className="px-5 py-2 rounded-full bg-blue-700/60 cursor-pointer  transition-all ease-in-out duration-200 hover:bg-blue-800"
                      type="button"
                      aria-label="Mark task as done"
                      title="Mark as done"
                    >
                      <img src={checkIconWhite} alt="" />
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
