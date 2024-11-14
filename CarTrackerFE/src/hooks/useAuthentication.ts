import { request } from "../api/request.js";
import { addAlert } from "../utils/addAlert.js";

export interface Credentials {
  email: string;
  password: string;
}

export interface RegisterDetails extends Credentials {
  name: string;
}

export const useAuthentication = () => {
  const login = async (credentials: Credentials) => {
    const [error, result] = await request("auth/login", credentials);
    if (error) {
      console.error("Error logging in:", error);
      addAlert({ key: "login", message: error.message });
      return null;
    }
    return result;
  };

  const register = async (userDetails: RegisterDetails) => {
    const [error, result] = await request("auth/register", userDetails);
    if (error) {
      console.error("Error registering:", error);
      addAlert({ key: "register", message: error.message });
      return null;
    }
    return result;
  };

  return {
    login,
    register,
  };
};
