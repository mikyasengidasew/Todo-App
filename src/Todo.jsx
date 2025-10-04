import { useState, useEffect } from "react";

import lightNavbarIcon from "../public/favicon-light.png";
import addIcon from "./assets/icons/icon-add.svg";
import clearIcon from "./assets/icons/icon-clear.svg";
import deleteIcon from "./assets/icons/icon-delete.svg";
import checkIcon from "./assets/icons/icon-check.svg";
import checkedIcon from "./assets/icons/icon-checked.svg";

function Todo() {
  return (
    <div>
      <div>
        <header>
          <nav>
            <a href="#">
              <img src={lightNavbarIcon} alt="Home" className="w-[100px]" />
            </a>
            <h1>Todo App</h1>
          </nav>
        </header>
        <main>
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
            />
            <label
              htmlFor="date-input"
              className="absolute size-[1px] p-0 m-[-1px] overflow-hidden whitespace-wrap border-0"
            >
              Insert a date
            </label>
            <input type="date" name="date-input" id="date-input" />
            <label
              htmlFor="time-input"
              className="absolute size-[1px] p-0 m-[-1px] overflow-hidden whitespace-wrap border-0"
            >
              Insert a time period
            </label>
            <input type="time" id="time-input" name="time-input" />
            <button type="button" aria-label="Add Task" title="Add task">
              <img src={addIcon} alt="" />
            </button>
            <button
              type="button"
              aria-label="Clear all tasks"
              title="Clear all tasks"
            >
              <img src={clearIcon} alt="" />
            </button>
          </form>
          <div id="error-message"></div>
          <ul>
            <li>
              <div>
                <span>Start Learning TypeScript</span>
                <span>10/02/2025</span>
                <span>05:30 AM</span>
              </div>
              <div>
                <button
                  type="button"
                  aria-label="Delete task"
                  title="Delete task"
                >
                  <img src={deleteIcon} alt="" />
                </button>
                <button
                  type="button"
                  aria-label="Mark task as done"
                  title="Mark as done"
                >
                  <img src={checkIcon} alt="" />
                </button>
              </div>
            </li>
          </ul>
        </main>
      </div>
    </div>
  );
}

export default Todo;
