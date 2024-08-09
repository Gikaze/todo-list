//import axios from "axios";
import { createContext, useContext, useReducer } from "react";

//import axios from "axios";

const FAKE_USER = {
  id: "669e5cc27cfc9e9c10a609b6",
  name: "Gilles",
  email: "romyjeff@googlemail.com",
  password: "pass1234",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

//const LOGIN_URL = "http://localhost:3000/api/v1/users/login";

const AuthContext = createContext();

const initialState = {
  users: [],
  isLoading: false,
  isAuthenticated: false,
  currentUser: FAKE_USER,
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "logout":
      return initialState;
    case "rejected":
      return { ...state, isAuthenticated: false, error: action.payload };
    default:
      throw new Error("This action is not covered");
  }
}

// eslint-disable-next-line react/prop-types
function AuthProvider({ children }) {
  const [{ user, isAuthenticated, currentUser, error }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  /*async function login(email, password) {
    console.log(email, password);

    try {
      const res = await axios({
        method: "POST",
        url: LOGIN_URL,
        data: {
          email,
          password,
        },
      });

      const data = await res.json();

      console.log(data);

      if (res.data.status === "success") {
        dispatch({ type: "login", payload: data.data });
      }
    } catch (err) {
      dispatch({
        type: "rejected",
        payload: `There was an error while logging in: ${err.message}`,
      });
    }
  }
    */

  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password)
      dispatch({ type: "login", payload: FAKE_USER });
  }

  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        error,
        currentUser,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext was used outside AuthProvider");

  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { AuthProvider, useAuth };
