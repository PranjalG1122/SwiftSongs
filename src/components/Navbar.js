import React from "react";
import { Home, Menu, X } from "react-feather";

export default function Navbar() {
  const [themeMenu, setThemeMenu] = React.useState(false);
  function clickedThemeMenu() {
    setThemeMenu(!themeMenu);
  }

  const body = document.body;
  if (localStorage.getItem("theme") === null) {
    localStorage.setItem("theme", "light");
  } else if (localStorage.getItem("theme") === "highcontrast") {
    body.classList.add("highcontrast");
  } else if (localStorage.getItem("theme") === "darkblue") {
    body.classList.add("darkblue");
  } else if (localStorage.getItem("theme") === "darkgray") {
    body.classList.add("darkgray");
  }
  function toggleLight() {
    body.classList.remove("highcontrast");
    body.classList.remove("darkblue");
    body.classList.remove("darkgray");
    localStorage.setItem("theme", "light");
  }
  function toggleHighContrast() {
    body.classList.remove("darkblue");
    body.classList.remove("darkgray");
    body.classList.add("highcontrast");
    localStorage.setItem("theme", "highcontrast");
  }
  function toggleDarkBlue() {
    body.classList.remove("highcontrast");
    body.classList.remove("darkgray");
    body.classList.add("darkblue");
    localStorage.setItem("theme", "darkblue");
  }
  function toggleDarkGray() {
    body.classList.remove("highcontrast");
    body.classList.remove("darkblue");
    body.classList.add("darkgray");
    localStorage.setItem("theme", "darkgray");
  }

  return (
    <>
      <nav className="flex justify-between items-center h-16 backdrop-blur fixed top-0 right-0 left-0 px-10 ">
        <a
          href="/"
          className="px-4 py-2 rounded transition-all hover:scale-125 "
        >
          <Home />
        </a>
        <div>
          <a href="/#" className="mx-2 transition-all px-4 py-2">
            Text1
          </a>
          <a href="/#" className="mx-2 transition-all px-4 py-2">
            Text1
          </a>
          <a href="/#" className="mx-2 transition-all px-4 py-2">
            Text1
          </a>
        </div>
        <button onClick={clickedThemeMenu}>Theme</button>
        <div
          className={
            `flex flex-col items-end fixed top-14 transition-all mr-10 border-2 p-2 rounded ` +
            (themeMenu ? "right-[-100%]" : "right-[0%]")
          }
        >
          <button onClick={toggleLight}>Light</button>
          <button onClick={toggleHighContrast}>High Contrast</button>
          <button onClick={toggleDarkBlue}>Dark Blue</button>
          <button onClick={toggleDarkGray}>Dark Gray</button>
        </div>
      </nav>
    </>
  );
}
