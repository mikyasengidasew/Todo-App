import { useState, useEffect } from "react";

import Form from "./Form";
import TodoRender from "./TodoRender";

export default function Main() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos"));
    return savedTodos ? savedTodos : [];
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <main className="grid gap-3">
      <Form setTodos={setTodos} />
      <TodoRender setTodos={setTodos} todos={todos}></TodoRender>
    </main>
  );
}
