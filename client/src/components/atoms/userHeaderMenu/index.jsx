import React from "react";
import { NavLink } from "react-router-dom";

function UserHeaderMenu({ options, toCancelClose, toCloseMenu, onLogout }) {
  const handleOptionClick = (option) => {
    if (option.onClick) {
      option.onClick();
    } else if (option.redirect) {
      toCloseMenu(); // Cerrar el menú al hacer clic en una opción de redirección
    }
  };

  return (
    <ul className="flex flex-col gap-1 absolute top-14 right-1 w-max">
      {options.map((option) => (
        <li key={option.text} className="text-center p-2 bg-primary-1 text-secondary-1">
          {option.onClick ? (
            <button
              onFocus={() => clearTimeout(toCancelClose)}
              onClick={() => handleOptionClick(option)}
              onBlur={toCloseMenu}
              id={`test-${option.dataTest}`}
              data-test={option.dataTest}
            >
              {option.text}
            </button>
          ) : (
            <NavLink
              onFocus={() => clearTimeout(toCancelClose)}
              onBlur={toCloseMenu}
              onClick={() => handleOptionClick(option)}
              key={option.text}
              to={option.redirect}
              id={option.dataTest}
            >
              {option.text}
            </NavLink>
          )}
        </li>
      ))}
    </ul>
  );
}

export default UserHeaderMenu;
