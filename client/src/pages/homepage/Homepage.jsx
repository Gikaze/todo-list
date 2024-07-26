import { Link } from "react-router-dom";
import styles from "./Homepage.module.css";
import PageNav from "./../../components/navbar/PageNav";
//import { useAuth } from "../contexts/FakeAuthContext";

export default function Homepage() {
  //const { isAuthenticated } = useAuth();
  return (
    <main className={styles.homepage}>
      <PageNav />
      <section>
        <h1>
          Organize your life.
          <br />
          On.Time keeps your tasks and events under control.
        </h1>
        <h2>
          An interactive calendar to schedule your events and choose meeting
          locations. Never miss an important appointment and track your daily
          progress. Create simple tasks and detailed events with ease.
        </h2>
      </section>
    </main>
  );
}
