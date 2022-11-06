import React from "react";

export function StyledButton({ children }) {
  return (
    <main>
      <button className="p-4 bg-zinc-400">{children}</button>
    </main>
  );
}
