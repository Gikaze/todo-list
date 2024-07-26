import { Link } from "react-router-dom";
import styles from "./Logo.module.css";

function Logo() {
  return (
    <Link to="/">
      <img src="/img/logo.png" alt="OnTime logo" className={styles.logo} />
    </Link>
  );
}

export default Logo;
