import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";

const BASE_URL = "http://localhost:3000/api/v1/users";

const AuthContext = createContext();

const initialState = {
  currentUser: null,
  token: null,
  isLoading: false,
  isAuthenticated: false,
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        ...state,
        currentUser: { id: action.payload.user._id, ...action.payload.user },
        token: action.payload.token,
        isAuthenticated: true,
        error: "",
      };
    case "register":
      return {
        ...state,
        currentUser: { id: action.payload._id, ...action.payload },
        isAuthenticated: false,
        error: "",
      };
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
  const [{ isAuthenticated, currentUser, error }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (token && user) {
      dispatch({ type: "login", payload: { user, token } });
    } else {
      dispatch({ type: "logout" });
    }
  }, []);

  async function login(email, password) {
    try {
      const res = await axios({
        method: "POST",
        url: `${BASE_URL}/login`,
        data: {
          email,
          password,
        },
        withCredentials: true,
      });

      const data = res.data;

      if (data.status === "success") {
        const { token, user } = data.data;

        localStorage.setItem("authToken", token);
        localStorage.setItem("currentUser", JSON.stringify(user));
        dispatch({ type: "login", payload: { user, token } });
      } else {
        throw new Error("Login failed");
      }
    } catch (err) {
      dispatch({
        type: "rejected",
        payload: err.response.data.message,
      });
    }
  }

  async function register(credentials, navigate) {
    try {
      const res = await axios({
        method: "POST",
        url: `${BASE_URL}/signup`,
        data: credentials,
        withCredentials: true,
      });

      const data = res.data;

      if (data.status === "success") {
        dispatch({ type: "register", payload: data.data.user });
        navigate("/login");
      } else {
        throw new Error("Register failed");
      }
    } catch (err) {
      dispatch({
        type: "rejected",
        payload: err.response.data.message,
      });
      navigate("/register");
    }
  }

  function logout() {
    localStorage.removeItem("authToken");
    localStorage.removeItem("currentUser");
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        error,
        currentUser,
        login,
        register,
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
