import React, { createContext, useCallback, useState, useContext } from "react";

import api from "../services/api";

import userDefault from "../assets/userDefault.png";

interface User {
  id: string;
  name: string;
  email: string;
  avatar_url: string;
}

interface AuthState {
  user: User;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  updateUser(user: User): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const user = localStorage.getItem("Whatshapp-clone:user");

    if (user) {
      return { user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post("/users/sessions", {
      email,
      password,
    });

    const { user } = response.data;

    localStorage.setItem("Whatshapp-clone:user", JSON.stringify(user));

    if (user.image === null) {
      user.image = userDefault;
    }

    setData({ user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem("Whatshapp-clone:user");

    setData({} as AuthState);
  }, []);

  const updateUser = useCallback((user: User) => {
    setData({ user });

    localStorage.setItem("Whatshapp-clone:user", JSON.stringify(user));
  }, []);

  return (
    <AuthContext.Provider
      value={{ user: data.user, signIn, signOut, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}

export { AuthProvider, useAuth };
