import deleteIcon from "../../assets/icons/icon-delete-white.svg";
import checkIcon from "../../assets/icons/icon-check-white.svg";
import checkedIcon from "../../assets/icons/icon-checked-white.svg";
import clsx from "clsx";

export default function TodoRender({ setTodos, todos }) {
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const checkTodo = (id) => {
    const updatedTodo = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodo);
  };

  return (
    <ul className="grid gap-3 bg-blue-500 text-white p-3 rounded-lg drop-shadow-xl drop-shadow-blue-300">
      {todos.map((todo) => {
        return (
          <li
            className="flex justify-between items-center p-2 bg-blue-600 rounded-lg cursor-pointer transition-all ease-in-out duration-100 hover:translate-x-[.5px] hover:translate-y-[-.5px]"
            key={todo.id}
          >
            <div className={clsx("grid", { "opacity-50": todo.completed })}>
              {!todo.edited ? (
                <span className="font-semibold text-lg">{todo.text}</span>
              ) : (
                <input
                  id="text-input"
                  name="text"
                  className="font-semibold text-lg"
                />
              )}
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
                onClick={() => deleteTodo(todo.id)}
              >
                <img src={deleteIcon} alt="" />
              </button>
              <button
                className="px-5 py-2 rounded-full bg-blue-700/60 cursor-pointer  transition-all ease-in-out duration-200 hover:bg-blue-800"
                type="button"
                aria-label="Mark task as done"
                title="Mark as done"
                onClick={() => checkTodo(todo.id)}
              >
                <img src={!todo.completed ? checkIcon : checkedIcon} alt="" />
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
// When the user double clicks the task item, all the inputs become editable.
// -> In the object structure that I have I need to add edited boolean.
// -> On double click flip the value of the edited boolean.
// -> If the edited boolean value is true, make all the inputs on the task item receive inputs.
// ->> To make the input button editable and to keep what's inside the task item, I will pass the values that I get from the loop as the value for the input.
// ->> Then I keep track of the changes using the onChange attribute, by getting the value of the input using a function.
// ->> Get the final value from the input fields and change the values in the object structure with them, on the user enter or double click.
// Check for any possible bugs and fix them around the localStorage, the task item structure and others.
