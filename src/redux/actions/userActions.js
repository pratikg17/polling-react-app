import axios from "axios";
import { message } from "antd";
import jwt from "jwt-decode";
import { baseUrl } from "../../config";
export const userLogin = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    const response = await axios.post(
      `${baseUrl}/api/v1/users/user-login`,
      reqObj
    );

    const jwtToken = response.data.token;
    const decodedJwt = jwt(jwtToken);

    localStorage.setItem("token", jwtToken);

    localStorage.setItem("user", JSON.stringify(decodedJwt));
    message.success("Login success");
    dispatch({ type: "LOADING", payload: false });
    setTimeout(() => {
      window.location.href = "/";
    }, 500);
  } catch (error) {
    console.log(error);
    message.error("Something went wrong");
    dispatch({ type: "LOADING", payload: false });
  }
};

export const userRegister = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    const response = await axios.post(`${baseUrl}/api/v1/users/`, reqObj);
    message.success("Registration Successful");
    setTimeout(() => {
      window.location.href = "/login";
    }, 500);

    dispatch({ type: "LOADING", payload: false });
  } catch (error) {
    console.log(error);
    message.error("Something went wrong");
    dispatch({ type: "LOADING", payload: true });
  }
};
