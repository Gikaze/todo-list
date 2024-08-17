import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "./../../contexts/AuthContext";
import Button from "./../../components/button/Button";
import PageNav from "./../../components/navbar/PageNav";
import styles from "./Register.module.css";

function Register() {
  // PRE-FILL FOR DEV PURPOSES

  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    //if (email && password) await login(email, password);

    const userData = {
      name,
      email,
      password,
      passwordConfirm,
    };

    try {
      await register(userData);
      navigate("/login");
    } catch (err) {
      console.error("Registration failed:", err.message);
    }
  }

  return (
    <main className={styles.register}>
      <PageNav />
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>
        <div className={styles.row}>
          <label htmlFor="email">Email Address</label>
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
        <div className={styles.row}>
          <label htmlFor="passwordConfirm">Confirm Password</label>
          <input
            type="password"
            id="passwordConfirm"
            onChange={(e) => setPasswordConfirm(e.target.value)}
            value={passwordConfirm}
          />
        </div>

        <div>
          <Button type="secondary">Register</Button>
        </div>
      </form>
    </main>
  );
}

export default Register;
