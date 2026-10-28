import { useReducer } from "react";
import { AuthContext } from "./AuthContextValue";

function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        isAuthenticated: true,
        currentUser: action.payload,
      };

    case "LOGOUT":
      return {
        isAuthenticated: false,
        currentUser: null,
      };

    default:
      return state;
  }
}

const savedUser = JSON.parse(localStorage.getItem("user"));

const initialState = {
  isAuthenticated: !!savedUser,
  currentUser: savedUser,
};

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  function login(user) {
    localStorage.setItem("user", JSON.stringify(user));

    dispatch({
      type: "LOGIN",
      payload: user,
    });
  }

  function logout() {
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
  }

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
