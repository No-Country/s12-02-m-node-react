import { NavLink } from "react-router-dom";

function NavbarItem({ text, route }) {
  return (
    <li className="hover:scale-110 transition-transform duration-300 ease-out-expo w-fit">
      <NavLink to={route} className="group">
        <span
        className="group-[.active]:text-secondary-3 group-[.active]:border-b-2 rounded-md border-secondary-2 group-[.active]:font-semibold text-primary-1 text-center px-1"
        >{text}</span>
      </NavLink>
    </li>
  );
}

export default NavbarItem;
