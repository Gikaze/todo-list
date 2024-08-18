import { Outlet } from "react-router-dom";
import AppNav from "./../appnav/AppNav";
import Footer from "./../footer/Footer";
import styles from "./AppContent.module.css";
import Logo from "../logo/Logo";
import User from "../user/User";
import { useAuth } from "../../contexts/AuthContext";

function AppContent() {
  const { isAuthenticated } = useAuth();
  return (
    <div className={styles.sidebar}>
      <div className={styles.appTop}>
        <Logo />
        {isAuthenticated && <User />}
      </div>
      <AppNav />
      <Outlet />
      <Footer />
    </div>
  );
}

export default AppContent;
