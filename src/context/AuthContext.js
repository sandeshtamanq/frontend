import jwtDecode from "jwt-decode";
import { createContext, useReducer, useEffect } from "react";
import { useNavigate } from "react-router-dom";
export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload, isLoggedIn: true };

    case "LOGOUT":
      return { user: null, isLoggedIn: false };

    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isLoggedIn: false,
  });

  const navigate = useNavigate();
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("access-token"));
    const user = JSON.parse(localStorage.getItem("user"));

    if (token && user) {
      const { exp } = jwtDecode(token);
      const currentDate = Date.now() / 1000;

      if (currentDate > exp) {
        localStorage.clear();
        navigate("/login");
        return;
      }
      dispatch({ type: "LOGIN", payload: user });
    }

    //eslint-disable-next-line
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
