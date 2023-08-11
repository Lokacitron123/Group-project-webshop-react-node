import { NavLink } from "react-router-dom";
import "./NavLinks.css";
import { AuthContext } from "../../context/UserContext";
import { useContext } from "react"

const NavLinks = () => {

  const { user } = useContext(AuthContext)

  return (
    <div className="nav-links">
      <ul>
        <li className="hover-effect__underline">
          <NavLink to="/">Products</NavLink>
        </li>

        <li className="hover-effect__underline">
          <NavLink to="/contact">Contact</NavLink>
        </li>

        {user?.isAdmin ? (
          <li className="hover-effect__underline">
            <NavLink to="/admin">Admin</NavLink>
          </li>
        ) : null}
      </ul>
    </div>
  );
};

export default NavLinks;
