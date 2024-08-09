/* eslint-disable */
import { Link } from "react-router-dom";
import styles from "./EventItem.module.css";
import { useEvents } from "../../contexts/EventsContext";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

function EventItem({ event }) {
  const { currentEvent } = useEvents();
  const { id } = event;
  const { title, description, location, startDate, startTime, endTime } = event;

  const currentDate = new Date().toISOString();

  function handleCompleted(e) {
    e.preventDefault();
  }

  function handleUpdate(e) {
    e.preventDefault();
  }

  function handleDelete(e) {
    e.preventDefault();
  }

  return (
    <li>
      <Link
        className={`${styles.eventItem} ${
          event.id === currentEvent.id ? styles["eventItem--active"] : ""
        }`}
        to={id}
      >
        <div className={styles.row}>
          <h3>
            {title} - {formatDate(startDate || null)}
          </h3>
          <h2>{description}</h2>
          <h3>
            <span>Location: {location}</span>
          </h3>
        </div>

        <button
          className={`${styles.checkedBtn} ${event.startDate < currentDate ? `${styles.completed}` : ""}`}
          onClick={handleCompleted}
        >
          &#10003;
        </button>
        <button className={styles.updateBtn} onClick={handleUpdate}>
          &#9998;
        </button>

        <button className={styles.deleteBtn} onClick={handleDelete}>
          &times;
        </button>
      </Link>
    </li>
  );
}

export default EventItem;
