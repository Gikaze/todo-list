import styles from "./Alert.component.css";

// eslint-disable-next-line react/prop-types
function Alert({ type, msg }) {
  return (
    <div className={`${styles.alert} ${type ? `alert--${type}` : ""}`}>
      {msg}
    </div>
  );
}

export default Alert;
