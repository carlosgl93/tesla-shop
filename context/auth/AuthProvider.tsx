import React, {
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { AlertColor } from "@mui/material";

import { tesloApi } from "../../api";
import { IUser } from "../../interfaces";
import { UiContext } from "../ui";
import { AuthContext, authReducer } from "./";

export interface AuthState {
  isLoggedIn: boolean;
  user?: IUser;
}

const AUTH_INITIAL_STATE: AuthState = {
  isLoggedIn: false,
};

const AuthProvider: FC<PropsWithChildren<AuthState>> = ({ children }) => {
  const { toggleSnackbar } = useContext(UiContext);

  const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    // llamar endpoint validate-token

    try {
      const { data } = await tesloApi.get("/user/validate-token");

      const { token, user } = data;
      Cookies.set("token", token);

      toggleSnackbar(`Welcome back ${user.name}`, "success");
      dispatch({ type: "Auth - Login", payload: user });
    } catch (error) {
      toggleSnackbar("Please login again", "error");
      console.log(error);
      Cookies.remove("token");
    }
  };

  const userLogin = async (
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      const { data } = await tesloApi.post("/user/login", { email, password });

      const { token, user } = data;
      Cookies.set("token", token);

      toggleSnackbar("Logged in successfully, redirecting you", "success");
      dispatch({
        type: "Auth - Login",
        payload: user,
      });

      return true;
    } catch (error: any) {
      console.log(error);
      toggleSnackbar(error?.response?.data?.message, "error");

      return false;
    }
  };

  const registerUser = async (
    name: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      const { data } = await tesloApi.post("/user/register", {
        name,
        email,
        password,
      });

      const { token, user } = data;
      Cookies.set("token", token);

      toggleSnackbar("Logged in successfully, redirecting you", "success");
      dispatch({
        type: "Auth - Register",
        payload: user,
      });

      return true;
    } catch (error: any) {
      toggleSnackbar(
        "There was an error registering. Please try again",
        "error"
      );
    }
    return false;
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,

        // Methods
        userLogin,
        registerUser,
        checkToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
