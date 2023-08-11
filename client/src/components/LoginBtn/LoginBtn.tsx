import React, { useContext, useState } from "react";
import { BiUser } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { AuthContext } from "../../context/UserContext";
import "./LoginBtn.css";
import LoginForm from "../LoginForm/LoginForm";
import WelcomeBtn from "../WelcomeBtn/WelcomeBtn";

const LoginBtn: React.FC = () => {
  const { user } = useContext(AuthContext);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const handleLoginButtonClick = () => {
    setShowLoginForm(true);
    setLoginSuccess(false);
  };

  const handleCloseButtonClick = () => {
    setShowLoginForm(false);
    setLoginSuccess(false);
  };

  const handleLoginSuccess = () => {
    setLoginSuccess(true);
  };

  return (
    <div>
      {!user ? (
        <div className="login-btn__container">
          <button
            className="login-btn__content"
            onClick={handleLoginButtonClick}
          >
            <BiUser />
          </button>
          <p>Logga in</p>
        </div>
      ) : (
        <WelcomeBtn />
      )}

      {showLoginForm && !loginSuccess && (
        <div
          className={`slide-in__container ${showLoginForm ? "slide-in" : ""}`}
        >
          <button className="close-button" onClick={handleCloseButtonClick}>
            <AiOutlineClose />
          </button>
          <LoginForm
            onLoginSuccess={handleLoginSuccess}
            handleCloseButtonClick={handleCloseButtonClick}
          />
        </div>
      )}
    </div>
  );
};

export default LoginBtn;
