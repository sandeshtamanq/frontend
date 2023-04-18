import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { signIn } from "../../api/api";
import { AuthContext } from "../../context/AuthContext";

const SignIn = () => {
  const navigate = useNavigate();
  const [error, setError] = useState({
    username: "",
    password: "",
  });
  const { dispatch } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [loginCredentials, setLoginCredentials] = useState({
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;

    setLoginCredentials((preval) => {
      return {
        ...preval,
        [name]: value,
      };
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (loginCredentials.username === "") {
      setError({
        ...error,
        username: "This field cannot be empty",
      });
    }
    if (loginCredentials.password === "") {
      setError({
        ...error,
        password: "This field cannot be empty",
      });
    }
    signIn(loginCredentials, dispatch, navigate, setLoading);
  };
  return (
    <div className="w-1/3 m-auto mt-40 p-4 shadow-md bg-gray-50 text-gray-800 rounded-md">
      Login
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="username">Username</label>
          <input id="username" type="email" name="email" value={loginCredentials.username} onChange={changeHandler} />
          {error.username && <p className="text-red-500 text-sm">{error.username}</p>}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" value={loginCredentials.password} onChange={changeHandler} />
          {error.password && <p className="text-red-500 text-sm">{error.password}</p>}
        </div>
        <button type="submit" className="bg-green-700 text-white px-6 py-2 mt-5 rounded-md">
          {loading ? "loading..." : "Login"}
        </button>
        <Link to="/signup">Sign Up</Link>
      </form>
    </div>
  );
};

export default SignIn;
