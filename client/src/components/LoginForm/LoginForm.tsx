import { useContext, useState, FormEvent } from "react";
import { AuthContext } from "../../context/UserContext";
import { NavLink } from "react-router-dom";
import "./LoginForm.css";

type LoginFormProps = {
  onLoginSuccess: () => void;
  handleCloseButtonClick: () => void;
};

const LoginForm: React.FC<LoginFormProps> = ({
  onLoginSuccess,
  handleCloseButtonClick,
}) => {
  const { login, setUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
 

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    try {
      login(email, password);
      onLoginSuccess();

    } catch (error) {
      console.error("An error occurred during login:", error);
      setError("Invalid email or password");
    }
  };

  return (
    <div className="login-form__container">
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="login-form__button" type="submit">
          Logga in
        </button>
        <button className="new-member__button" onClick={handleCloseButtonClick}>
          <NavLink to="/registeruser" className={"a-link"}>
            Bli medlem
          </NavLink>
        </button>
      </form>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default LoginForm;
