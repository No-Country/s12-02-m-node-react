import React from "react";

function NavbarButton({ text, handler, filled = false }) {
  return (
    <button
      onClick={(e) => {
        e.preventDefault;
        handler(e);
      }}
      className={`rounded-3xl py-2 px-4 text-primary-1 border-solid border-2 hover:scale-105 transition-transform duration-300 ease-out-expo ${
        filled ? "border-secondary-2 bg-secondary-2" : "border-primary-1 "
      }`}
    >
      {text}
    </button>
  );
}

export default NavbarButton;
