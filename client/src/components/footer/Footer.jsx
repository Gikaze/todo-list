import styles from "./../appcontent/AppContent.module.css";
function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.copyright}>
        &copy; Copyright {new Date().getFullYear()} by OnTime Inc.
      </p>
    </footer>
  );
}

export default Footer;
