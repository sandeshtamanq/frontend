import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { signIn } from "../../api/api";
import { AuthContext } from "../../context/AuthContext";

const SignIn = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);
  const [loginCredentials, setLoginCredentials] = useState({
    username: "",
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
    if (loginCredentials.username === "" || loginCredentials.password === "")
      return;
    signIn(loginCredentials, dispatch, navigate);
  };
  return (
    <div className="w-1/3 m-auto mt-40 p-4 bg-gray-300 text-gray-800 rounded-md">
      Login
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            name="username"
            value={loginCredentials.username}
            onChange={changeHandler}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={loginCredentials.password}
            onChange={changeHandler}
          />
        </div>
        <button
          type="submit"
          className="bg-green-700 text-white px-6 py-2 mt-5 rounded-md"
        >
          Login
        </button>
        <Link to="/signup">Sign Up</Link>
      </form>
    </div>
  );
};

export default SignIn;
