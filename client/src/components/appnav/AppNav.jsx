import { NavLink } from "react-router-dom";
import styles from "./AppNav.module.css";

function AppNav() {
  return (
    <nav className={styles.nav}>
      <nav className={styles.nav}>
        <ul>
          <li>
            <NavLink to="tasks">Tasks</NavLink>
          </li>
          <li>
            <NavLink to="events">Events</NavLink>
          </li>
          <li>
            <NavLink to="map">Map</NavLink>
          </li>
          <li>
            <NavLink to="calendar">Calendar</NavLink>
          </li>
        </ul>
      </nav>
    </nav>
  );
}

export default AppNav;
