import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./components/Auth/SignIn";
import SignUp from "./components/Auth/SignUp";
import Home from "./components/Home/Home";
import { AuthContext } from "./context/AuthContext";
function App() {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <>
      <Routes>
        <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={!isLoggedIn ? <SignIn /> : <Navigate to="/" />} />
        <Route path="/signup" element={!isLoggedIn ? <SignUp /> : <Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
