import { createContext, useState, ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isAdmin?: boolean;
}

interface AuthContextProps {
  user: User | null;
  setUser: (user: User | null) => void;
  login: (email: string, password: string) => void;
  logout: () => void;
  registerUser: (user: User) => void;
}

const initialAuthContext: AuthContextProps = {
  user: null,
  setUser: () => {},
  login: () => {},
  logout: () => {},
  registerUser: () => {},
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextProps>(initialAuthContext);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data);
        console.log("Login was successful");
      } else {
        throw new Error("Invalid email or password");
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      const response = await fetch("/api/users/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 204) {
        setUser(null);
        console.log("Logout was successful");
      }
    } catch (error) {
      console.error("An error occurred during logout:", error);
      throw error;
    }
  };

  const registerUser = async (newUser: User) => {
    try {
      const response = await fetch("/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data);
        login(newUser?.email, newUser?.password)
        console.log("Registration was successful");
      } else {
        throw new Error("Registration failed");
      }
    } catch (error) {
      console.error("An error occurred during registration:", error);
      throw error;
    }
  };

  useEffect(() => {
    const authorize = async () => {
      const response = await fetch("/api/users/authorize", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await response.json();
      if (response.status === 200) {
        setUser(data);
      } else {
        setUser(null);
      }
    };
    authorize();
  }, []);

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <AuthContext.Provider
      value={{ user, login, logout, setUser, registerUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
