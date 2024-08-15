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

  // Utilise la photo de l'utilisateur ou la photo par défaut
  const userPhoto = currentUser.photo
    ? `http://localhost:3000/img/users/${currentUser.photo}`
    : "http://localhost:3000/img/users/default.jpg";

  function handleClick() {
    logout();
    navigate("/");
  }

  return (
    <div className={styles.user}>
      <img src={userPhoto} alt={currentUser.name} />
      <span>Welcome, {currentUser.name}</span>
      <button onClick={handleClick}>Logout</button>
    </div>
  );
}

export default User;
