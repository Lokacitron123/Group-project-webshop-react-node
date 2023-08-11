import { useContext } from "react";
import { BiUser } from "react-icons/bi";
import { AuthContext } from "../../context/UserContext";
import { NavLink } from "react-router-dom";
import "./WelcomeBtn.css";

const WelcomeBtn = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      {user ? (
        <div className="welcome-btn__container">
          <NavLink to="/user" className="welcome-btn__content">
            <BiUser />
          </NavLink>
          <p>Välkommen</p>
        </div>
      ) : null}
    </>
  );
};

export default WelcomeBtn;
