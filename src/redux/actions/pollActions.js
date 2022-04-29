import { message } from "antd";
import axios from "axios";
import { baseUrl } from "../../config";

export const addPoll = (reqObj) => async (dispatch) => {
  const token = localStorage.getItem("token");
  const userId = JSON.parse(localStorage.getItem("user")).userId;
  dispatch({ type: "LOADING", payload: true });

  let data = {
    ...reqObj,
    userId,
  };

  try {
    await axios.post(`${baseUrl}/api/v1/polls/`, data, {
      headers: {
        Authorization: token, //the token is a variable which holds the token
      },
    });

    dispatch({ type: "LOADING", payload: false });
    message.success("New poll added successfully");
    setTimeout(() => {
      window.location.href = "/";
    }, 500);
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
  }
};

export const editPoll = (reqObj) => async (dispatch) => {
  const token = localStorage.getItem("token");
  const userId = JSON.parse(localStorage.getItem("user")).userId;
  dispatch({ type: "LOADING", payload: true });

  let data = {
    ...reqObj,
    userId,
  };

  try {
    await axios.post(`${baseUrl}/api/v1/polls/update-poll`, data, {
      headers: {
        Authorization: token, //the token is a variable which holds the token
      },
    });

    dispatch({ type: "LOADING", payload: false });
    message.success("New poll added successfully");
    setTimeout(() => {
      window.location.href = "/";
    }, 500);
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
  }
};

export const getAllMyPolls = () => async (dispatch) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user")).userId;
  dispatch({ type: "LOADING", payload: true });
  try {
    const response = await axios.get(`${baseUrl}/api/v1/polls/my-polls`, {
      headers: {
        Authorization: token, //the token is a variable which holds the token
      },
      params: { user_id: user },
    });
    console.log(response);
    dispatch({ type: "GET_MY_POLLS", payload: response.data.polls });
    dispatch({ type: "LOADING", payload: false });
  } catch (error) {
    throw error;
  }
};

export const getAllPollsResult = () => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });
  try {
    const response = await axios.get(
      `${baseUrl}/api/v1/polls/get-poll-results`
    );
    console.log(response);
    dispatch({ type: "GET_ALL_POLL_RESULTS", payload: response.data.results });
    dispatch({ type: "LOADING", payload: false });
  } catch (error) {
    throw error;
  }
};

export const getPollById = (pollId) => async (dispatch) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user")).userId;
  dispatch({ type: "LOADING", payload: true });
  try {
    const response = await axios.get(`${baseUrl}/api/v1/polls/poll-by-id`, {
      headers: {
        Authorization: token, //the token is a variable which holds the token
      },
      params: { poll_id: pollId },
    });
    console.log(response);
    dispatch({ type: "GET_POLL_BY_ID", payload: response.data.polls[0] });
    dispatch({ type: "LOADING", payload: false });
  } catch (error) {
    throw error;
  }
};
