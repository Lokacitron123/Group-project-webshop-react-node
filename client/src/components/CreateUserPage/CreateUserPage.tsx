import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/UserContext";
import "./CreateUserPage.css";
import { useNavigate } from "react-router-dom";

interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const CreateUserPage: React.FC = () => {
  const { registerUser } = useContext(AuthContext);
  const navigate = useNavigate()

  const [user, setUser] = useState<IUser>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    registerUser(user);
    navigate("/");
  };

  return (
    <main className="wrapper">
      <div className="wrapper-children__container">
        <div className="info-container">
          <h1>Dummy Heading</h1>
          <p>This is some dummy text.</p>
        </div>
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="firstName">First Name:</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={user.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name:</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={user.lastName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={user.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={user.password}
                onChange={handleChange}
              />
            </div>
            <button type="submit">Create User</button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default CreateUserPage;
