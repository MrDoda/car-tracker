import { request } from "../api/request.js";
import { addAlert } from "../utils/addAlert.js";

export interface HelloRequestData {
  helloName: string;
}

export interface HelloResponse {
  message: string;
}

export const useHelloWorld = () => {
  const helloWorld = async (data: HelloRequestData) => {
    const [error, result] = await request<HelloResponse>(
      "example/hello-world",
      data
    );
    if (error) {
      console.error("Error logging in:", error);
      addAlert({ key: "login", message: error.message });
      return null;
    }
    return result;
  };

  return {
    helloWorld,
  };
};
