import axios from "axios";
import jwtDecode from "jwt-decode";

// export const BASE_URL = "http://localhost:3000/api";
// export const BASE_URL = "https://fair-trousers-deer.cyclic.app/api";
export const BASE_URL = "https://to-do-wypj.onrender.com/api";

export const getAllTask = async (setAllTasks) => {
  const accessToken = JSON.parse(localStorage.getItem("access-token"));
  try {
    const res = await axios.get(`${BASE_URL}/task`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    setAllTasks(res.data.tasks);
  } catch (err) {
    console.log(err);
  }
};

export const signIn = async (credentials, dispatch, navigate, setLoading) => {
  setLoading(true);
  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ ...credentials }),
    });
    const token = await response.json();
    if (token.access_token) {
      localStorage.setItem("access-token", JSON.stringify(token.access_token));
      const user = jwtDecode(token.access_token);
      localStorage.setItem("user", JSON.stringify(user));
      dispatch({ type: "LOGIN", payload: token.username });
      navigate("/");
    }
    setLoading(false);
  } catch (err) {
    setLoading(false);
    console.log(err.response);
  }
};

export const signUp = async (credentials, navigate, setLoading) => {
  setLoading(true);
  try {
    await axios.post(`${BASE_URL}/auth/register`, {
      ...credentials,
    });
    setLoading(false);
    navigate("/login");
  } catch (err) {
    setLoading(false);
    console.log(err);
  }
};

export const addTask = async (task, setTask, setAllTasks) => {
  const accessToken = JSON.parse(localStorage.getItem("access-token"));
  try {
    const response = await axios.post(
      `${BASE_URL}/task`,
      { ...task },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    setTask({
      title: "",
      description: "",
    });

    setAllTasks((prevTask) => {
      return [...prevTask, response.data.task];
    });
    console.log(response);
  } catch (err) {
    console.log(err);
  }
};

export const updateTask = async (id, task) => {
  const accessToken = JSON.parse(localStorage.getItem("access-token"));
  try {
    const response = await axios.patch(
      `${BASE_URL}/task/${id}`,
      {
        status: task,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  } catch (err) {
    console.log(err);
  }
};
