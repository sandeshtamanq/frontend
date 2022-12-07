import axios from "axios";

export const BASE_URL = "http://localhost:3000";

export const getAllTask = async (setAllTasks) => {
  const accessToken = JSON.parse(localStorage.getItem("access-token"));
  try {
    const res = await axios.get(`${BASE_URL}/task`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    setAllTasks(res.data);
  } catch (err) {
    console.log(err);
  }
};

export const signIn = async (credentials, dispatch, navigate) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...credentials }),
    });
    const token = await response.json();
    if (token.accessToken) {
      localStorage.setItem("access-token", JSON.stringify(token.accessToken));
      localStorage.setItem("user", JSON.stringify(token.username));
      dispatch({ type: "LOGIN", payload: token.username });
      navigate("/");
    }
  } catch (err) {
    console.log(err.response);
  }
};

export const signUp = async (credentials, navigate) => {
  try {
    await axios.post(`${BASE_URL}/auth/signup`, {
      ...credentials,
    });
    navigate("/login");
  } catch (err) {
    console.log(err);
  }
};
