import { createContext, useContext, useEffect, useState } from "react";
import { signupUser, loginUser } from "../services/authService";

const AuthContext = createContext();

const CURRENT_USER_KEY = "medivault_current_user";

const TOKEN_KEY = "medivault_token";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem(CURRENT_USER_KEY);

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const signup = async ({ name, email, password }) => {
    try {
      const data = await signupUser({
        name,
        email,
        password,
      });

      return {
        success: true,
        data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  };

  const login = async ({ email, password }) => {
    try {
      const data = await loginUser({
        email,
        password,
      });

     const loggedInUser = data.user || data;

      localStorage.setItem(
      CURRENT_USER_KEY,
      JSON.stringify(loggedInUser)
      );

      localStorage.setItem(
      TOKEN_KEY,
      data.token
      );

      setUser(loggedInUser);

      return {
        success: true,
        user: loggedInUser,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  };

    const logout = () => {
    localStorage.removeItem(CURRENT_USER_KEY);
    localStorage.removeItem(TOKEN_KEY);
    setUser(null);
    };

  const updateProfile = (updatedData) => {
    if (!user) {
      return {
        success: false,
        message: "No logged in user found.",
      };
    }

    const updatedUser = {
      ...user,
      ...updatedData,
    };

    localStorage.setItem(
      CURRENT_USER_KEY,
      JSON.stringify(updatedUser)
    );

    setUser(updatedUser);

    return {
      success: true,
      user: updatedUser,
    };
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signup,
        login,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const useAuth = () => useContext(AuthContext);
