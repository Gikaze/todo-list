import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "./../../contexts/AuthContext";
import Button from "./../../components/button/Button";
import PageNav from "./../../components/navbar/PageNav";
import styles from "./Login.module.css";
//import Alert from "../../components/alert/Alert";
import Message from "../../components/message/Message";
//import Message from "../../components/message/Message";

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isAuthenticated, error } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (email && password) await login(email, password);
    setEmail("");
    setPassword("");
  }

  useEffect(
    function () {
      if (isAuthenticated) navigate("/app/tasks", { replace: true });
    },
    [isAuthenticated, navigate],
  );

  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type="secondary">Login</Button>
        </div>
        {error && <Message message={error} />}
      </form>
    </main>
  );
}
