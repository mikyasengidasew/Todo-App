import { useState, useEffect, useRef } from "react";

import addIcon from "../../assets/icons/icon-add-white.svg";
import clearIcon from "../../assets/icons/icon-clear-white.svg";

export default function Form({ setTodos }) {
  const [formData, setFormData] = useState({
    text: "",
    date: "",
    time: "",
  });

  // const inputRef = useRef(null);

  // useEffect(() => {
  //   inputRef.current.focus();
  // });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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
      edited: false,
      text: formData.text,
      date: formData.date,
      time: formData.time,
    };

    setTodos((prev) => [...prev, todoItem]);
    setFormData((prev) => ({
      ...prev,
      text: "",
      date: "",
      time: "",
    }));
  };

  return (
    <form
      className="grid gap-5 justify-items-center bg-blue-500 p-5 rounded-lg drop-shadow-xl drop-shadow-blue-500/60"
      onSubmit={(e) => e.preventDefault()}
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
          <img src={addIcon} alt="" />
          <span>Add Task</span>
        </button>
        <button
          className="flex justify-center gap-2 bg-blue-500/90 px-3 pr-4 py-3 rounded-lg font-semibold text-white cursor-pointer drop-shadow-blue-600 drop-shadow-md transition-all ease-in-out duration-400 hover:bg-blue-500 hover:drop-shadow-blue-700 hover:drop-shadow-lg"
          type="button"
          aria-label="Clear all tasks"
          title="Clear all tasks"
          onClick={() => setTodos([])}
        >
          <img src={clearIcon} alt="" />
          <span>Clear Tasks</span>
        </button>
      </fieldset>
    </form>
  );
}
