import React from "react";

function NavbarButton({
  text,
  handler,
  filled = false,
  color = "secondary-2",
  line = "primary-1",
  dataTest = "",
}) {
  return (
    <button
      data-test={dataTest}
      onClick={(e) => {
        e.preventDefault;
        handler(e);
      }}
      className={`rounded-3xl py-2 px-4 text-${line} border-solid border-2 hover:scale-105 transition-transform duration-300 ease-out-expo ${
        filled ? `border-${color} bg-${color}` : `border-${line}`
      }`}
    >
      {text}
    </button>
  );
}

export default NavbarButton;
