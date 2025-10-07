import Header from "./components/Header";
import Main from "./components/Main/Main";

function Todo() {
  return (
    <div className="h-svh flex items-center justify-center">
      <div className="h-fit flex flex-col gap-10">
        <Header />
        <Main />
      </div>
    </div>
  );
}

export default Todo;
