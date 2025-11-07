import React, { createContext, useReducer, useEffect } from "react";
import jwt_decode from "jwt-decode";

const AuthContext = createContext();

const initialState = { user: null, token: null };

function reducer(state, action) {
  switch(action.type) {
    case "LOGIN":
      return { ...state, user: action.payload.user, token: action.payload.token };
    case "LOGOUT":
      return { user: null, token: null };
    default: return state;
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwt_decode(token);
      dispatch({ type: "LOGIN", payload: { user: decoded, token }});
    }
  }, []);
  return <AuthContext.Provider value={{ state, dispatch }}>{children}</AuthContext.Provider>;
}

export default AuthContext;
