import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import styles from "./User.module.css";

function User() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

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
      <span>{currentUser.name}</span>
      <button onClick={handleClick}>Logout</button>
    </div>
  );
}

export default User;
