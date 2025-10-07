import deleteIcon from "../../assets/icons/icon-delete-white.svg";
import checkIcon from "../../assets/icons/icon-check-white.svg";
import checkedIcon from "../../assets/icons/icon-checked-white.svg";

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
            <div className={!todo.completed ? "grid" : "opacity-50 grid"}>
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
