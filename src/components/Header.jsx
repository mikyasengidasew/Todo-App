import lightNavbarIcon from "../../public/favicon-light.png";

export default function Header() {
  return (
    <header>
      <nav className="flex items-center gap-5">
        <a href="#">
          <img src={lightNavbarIcon} alt="Home" className="w-[75px]" />
        </a>
        <h1 className="text-5xl font-bold ">Todo App</h1>
      </nav>
    </header>
  );
}
