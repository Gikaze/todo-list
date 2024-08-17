//import { useEffect } from "react";
import styles from "./Alert.module.css";

// eslint-disable-next-line react/prop-types
function Alert({ type, message }) {
  return (
    <div className={`${styles.alert} ${type ? `alert--${type}` : ""}`}>
      {message}
    </div>
  );
}

export default Alert;
