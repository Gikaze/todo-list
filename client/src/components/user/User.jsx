//import { useNavigate } from "react-router-dom";
//import { useAuth } from "../contexts/FakeAuthContext";
import { useNavigate } from "react-router-dom";
import styles from "./User.module.css";
import { useAuth } from "../../contexts/AuthContext";
/*
const FAKE_USER = {
  id: "669e5cc27cfc9e9c10a609b6",
  name: "Gilles",
  email: "romyjeff@googlemail.com",
  password: "pass1234",
  avatar: "https://i.pravatar.cc/100?u=zz",
};
*/
function User() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  //const user = FAKE_USER;

  function handleClick() {
    logout();
    navigate("/");
  }

  return (
    <div className={styles.user}>
      <img src={currentUser.avatar} alt={currentUser.name} />
      <span>Welcome, {currentUser.name}</span>
      <button onClick={handleClick}>Logout</button>
    </div>
  );
}

export default User;

/*
CHALLENGE

1) Add `AuthProvider` to `App.jsx`
2) In the `Login.jsx` page, call `login()` from context
3) Inside an effect, check whether `isAuthenticated === true`. If so, programatically navigate to `/app`
4) In `User.js`, read and display logged in user from context (`user` object). Then include this component in `AppLayout.js`
5) Handle logout button by calling `logout()` and navigating back to `/`
*/
