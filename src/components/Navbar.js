import React from "react";

export default function Navbar() {
  const body = document.body;
  if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark");
  } else if (localStorage.getItem("theme") === "blue") {
    body.classList.add("blue");
  } else if (localStorage.getItem("theme") === "gray") {
    body.classList.add("gray");
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
      <nav className="flex justify-between items-center h-16 backdrop-blur fixed top-0 right-0 left-0 ">
        <button onClick={toggleLight}>Light</button>
        <button onClick={toggleHighContrast} className="mr-10">
          High Contrast
        </button>
        <button onClick={toggleDarkBlue}>Dark Blue</button>
        <button onClick={toggleDarkGray}>Dark Gray</button>
      </nav>
    </>
  );
}
