import editIcon from "../../assets/icons/icon-edit-white.svg";
import deleteIcon from "../../assets/icons/icon-delete-white.svg";
import checkIcon from "../../assets/icons/icon-check-white.svg";
import checkedIcon from "../../assets/icons/icon-checked-white.svg";
import clsx from "clsx";
import { useState, useEffect, useRef } from "react";

/**
 * TodoRender
 * Props:
 *  - todos: array of todo objects { id, text, date, time, completed, edited }
 *  - setTodos: state setter (function)
 *
 * Improvements made:
 * - Single-edit-at-a-time via editingId state
 * - Safe functional updates (setTodos(prev => ...))
 * - Auto-focus input when editing starts
 * - Enter to save, Escape to cancel
 * - Prevent saving empty text (trimmed)
 * - Cancel restores previous text (no accidental overwrite)
 * - Buttons use type="button" and have aria-labels; icons are decorative (alt="")
 */
export default function TodoRender({ todos, setTodos }) {
  // Temporary buffer for the text being edited
  const [editText, setEditText] = useState("");
  // id of the todo currently being edited (null = none)
  const [editingId, setEditingId] = useState(null);
  const inputRef = useRef(null);

  // ---------- CRUD helpers (use functional updates to avoid stale closures) ----------
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
    // If deleting the item currently being edited, clear edit state
    if (editingId === id) {
      setEditingId(null);
      setEditText("");
    }
  };

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  // ---------- Editing flow ----------
  function startEditing(id) {
    // find the todo text to pre-fill
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;
    // Only one todo may be edited at a time — disable any other edit modes
    setTodos((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, edited: true } : { ...t, edited: false }
      )
    );
    setEditingId(id);
    setEditText(todo.text ?? "");
  }

  function cancelEditing(id) {
    // Clear edited flag for the todo and reset local editing state
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, edited: false } : t))
    );
    setEditingId(null);
    setEditText("");
  }

  function saveEditing(id) {
    const trimmed = editText.trim();
    if (trimmed === "") {
      // Simple UX: don't allow empty text — you can change this behavior if desired
      alert("Please type something before saving.");
      return;
    }
    setTodos((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, text: trimmed, edited: false } : t
      )
    );
    setEditingId(null);
    setEditText("");
  }

  // When editingId changes, focus the input (single-edit model)
  useEffect(() => {
    if (editingId && inputRef.current) {
      inputRef.current.focus();
      // optionally select the text for quick overwrite
      inputRef.current.select?.();
    }
  }, [editingId]);

  // ---------- JSX ----------
  return (
    <ul className="grid gap-3 bg-blue-500 text-white p-3 rounded-lg drop-shadow-xl drop-shadow-blue-300">
      {todos.map((todo) => {
        const isEditing = editingId === todo.id || todo.edited === true;

        return (
          <li
            key={todo.id}
            className={clsx(
              "flex justify-between items-center p-2 bg-blue-600 rounded-lg transition-all ease-in-out duration-100",
              "hover:translate-x-[.5px] hover:translate-y-[-.5px]",
              // make pointer only when not editing input; keep cursor-text if input present
              { "cursor-text": isEditing, "cursor-pointer": !isEditing }
            )}
            // double-click to start editing (keeps behavior you had)
            onDoubleClick={() => startEditing(todo.id)}
          >
            <div
              className={clsx("grid gap-1", { "opacity-50": todo.completed })}
            >
              {/* conditional: show input when editing; otherwise plain text */}
              {!isEditing ? (
                <span className="font-semibold text-lg p-1">{todo.text}</span>
              ) : (
                <input
                  ref={inputRef}
                  type="text"
                  aria-label="Edit task text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      // save on Enter
                      saveEditing(todo.id);
                    } else if (e.key === "Escape") {
                      // cancel on Escape
                      cancelEditing(todo.id);
                    }
                  }}
                  className="border-0 outline-4 outline-blue-700 p-1 text-lg font-medium rounded-sm focus:outline-blue-300 text-black"
                />
              )}

              <span className="text-sm opacity-90">{todo.date}</span>

              <span className="text-sm font-medium">
                <label
                  htmlFor="time-input"
                  className="text-[1.3rem] cursor-pointer"
                >
                  @
                </label>{" "}
                {todo.time}
              </span>
            </div>

            <div className="grid gap-2 grid-cols-3">
              {/* Delete */}
              <button
                className="px-4 py-2 rounded-full bg-red-600/65 transition-all duration-200 hover:bg-red-600"
                type="button"
                aria-label="Delete task"
                title="Delete task"
                onClick={() => deleteTodo(todo.id)}
              >
                <img src={deleteIcon} alt="" />
              </button>

              {/* Edit / Save */}
              <button
                className="px-4 py-2 rounded-full bg-blue-700/60 transition-all duration-200 hover:bg-blue-800"
                type="button"
                aria-label={isEditing ? "Save task" : "Edit task"}
                title={isEditing ? "Save task" : "Edit task"}
                onClick={() => {
                  if (isEditing) saveEditing(todo.id);
                  else startEditing(todo.id);
                }}
              >
                <img src={isEditing ? checkedIcon : editIcon} alt="" />
              </button>

              {/* Toggle Completed */}
              <button
                className="px-4 py-2 rounded-full bg-blue-700/60 transition-all duration-200 hover:bg-blue-800"
                type="button"
                aria-label="Toggle complete"
                title="Mark as done"
                onClick={() => toggleComplete(todo.id)}
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
