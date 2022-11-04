import React from "react";

export default function Container({ children, top }) {
  return (
    <main
      className={
        `flex flex-col justify-around items-start w-screen max-w-[900px] ` + top
      }
    >
      {children}
    </main>
  );
}
