import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "../../api/api";

const SignUp = () => {
  const [userCredentials, setUserCredentials] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const changeHandler = (e) => {
    const { name, value } = e.target;

    setUserCredentials((preCredential) => {
      return {
        ...preCredential,
        [name]: value,
      };
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (userCredentials.username === "" || userCredentials.password === "")
      return;
    signUp(userCredentials, navigate);
  };
  return (
    <div className="w-1/3 m-auto mt-40 p-4 bg-gray-300 text-gray-800 rounded-md">
      Sign Up
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            name="username"
            value={userCredentials.username}
            onChange={changeHandler}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={userCredentials.password}
            onChange={changeHandler}
          />
        </div>
        <button
          type="submit"
          className="bg-green-700 text-white px-6 py-2 mt-5 rounded-md"
        >
          Sign UP
        </button>
      </form>
      <div>
        Already have account? <Link to="/login">Login</Link>
      </div>
    </div>
  );
};

export default SignUp;
