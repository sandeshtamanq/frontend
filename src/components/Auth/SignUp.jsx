import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "../../api/api";

const SignUp = () => {
  const [userCredentials, setUserCredentials] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const changeHandler = (e) => {
    setError(false);
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
    if (userCredentials.email === "" || userCredentials.password === "" || userCredentials.firstName === "" || userCredentials.lastName === "") {
      setError(true);
      return;
    }
    if (userCredentials.password.length < 7) {
      setPasswordError(true);
    }
    signUp(userCredentials, navigate, setLoading);
  };
  return (
    <div className="w-1/3 m-auto mt-40 p-4 bg-gray-50 shadow-lg text-gray-800 rounded-md">
      Sign Up
      {error && <p className="text-red-500 text-sm">Please fill all the fields</p>}
      <form onSubmit={submitHandler}>
        <div className="flex items-center gap-x-4">
          <div className="flex-1">
            <label htmlFor="firstName">First Name</label>
            <input id="firstName" type="text" name="firstName" value={userCredentials.firstName} onChange={changeHandler} placeholder="Enter First Name" />
          </div>
          <div className="flex-1">
            <label htmlFor="lastName">Last Name</label>
            <input id="lastName" type="text" name="lastName" value={userCredentials.lastName} onChange={changeHandler} placeholder="Enter Last Name" />
          </div>
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" value={userCredentials.email} onChange={changeHandler} placeholder="Enter Email" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" value={userCredentials.password} onChange={changeHandler} placeholder="Enter Password" />
          {passwordError && <p className="text-sm text-red-500">Password must be 7 characters long</p>}
        </div>
        <button type="submit" className="bg-green-700 text-white px-6 py-2 mt-5 rounded-md">
          {loading ? "Loading" : "Sign Up"}
        </button>
      </form>
      <div>
        Already have account? <Link to="/login">Login</Link>
      </div>
    </div>
  );
};

export default SignUp;
