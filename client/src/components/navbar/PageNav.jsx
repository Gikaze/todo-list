import { NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Logo from "./../logo/Logo";
import Button from "./../button/Button";
import styles from "./PageNav.module.css";

function PageNav() {
  const { isAuthenticated, logout } = useAuth();
  return (
    <nav className={styles.nav}>
      <Logo />
      <ul>
        <li>
          <NavLink to="/app">App</NavLink>
        </li>
        <li>
          <NavLink to="/chatia">IA</NavLink>
        </li>
        <li>
          {isAuthenticated ? (
            <Button type="back" onClick={() => logout()}>
              Logout
            </Button>
          ) : (
            <NavLink to="/login" className={styles.ctaLink}>
              Login
            </NavLink>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default PageNav;
