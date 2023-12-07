import { NavLink } from "react-router-dom";

function UserHeaderMenu({ options, toCancelClose, toCloseMenu }) {
  return (
    <ul className="flex flex-col gap-1 absolute top-14 right-1 w-max">
      {options.map((option) => (
        <li className="text-center p-2 bg-primary-1 text-secondary-1">
          <NavLink
            onFocus={() => clearTimeout(toCancelClose)}
            onBlur={toCloseMenu}
            onClick={toCloseMenu}
            key={option.text}
            to={option.redirect}
            id={`test-${option.dataTest}`}
          >
            {option.text}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}

export default UserHeaderMenu;
