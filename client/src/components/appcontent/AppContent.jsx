import { Outlet } from "react-router-dom";
import AppNav from "./../appnav/AppNav";

import Footer from "./../footer/Footer";
import styles from "./AppContent.module.css";
//import PageNav from "../navbar/PageNav";
import Logo from "../logo/Logo";
import Alert from "../alert/Alert";
//import Map from "../map/Map";
//import Logo from "./../logo/Logo";

function AppContent() {
  return (
    <div className={styles.sidebar}>
      <Alert />
      <Logo />
      <AppNav />
      <Outlet />

      <Footer />
    </div>
  );
}

export default AppContent;
