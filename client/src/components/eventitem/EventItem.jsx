/* eslint-disable */
import { Link, useNavigate } from "react-router-dom";
import styles from "./EventItem.module.css";
import { useEvents } from "../../contexts/EventsContext";

function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

function EventItem({ event }) {
  const { currentEvent } = useEvents();
  const { id } = event;
  const navigate = useNavigate();
  const { title, description, location, startDate, startTime, endTime } = event;

  const currentDate = new Date().toISOString();

  function handleCompleted(e) {
    e.preventDefault();
  }

  function handleUpdate(e) {
    e.preventDefault();
    navigate(`update/${id}`);
  }

  function handleDelete(e) {
    e.preventDefault();
    navigate(`delete/${id}`);
  }

  return (
    <li>
      <Link
        className={`${styles.eventItem} ${
          event.id === currentEvent.id ? styles["eventItem--active"] : ""
        }`}
        to={`${id}?lat=${event.location.coordinates.at(0)}&lng=${event.location.coordinates.at(1)}`}
      >
        <div className={styles.row}>
          <h3>
            {title} - {formatDate(startDate || null)}
          </h3>
          <h2>{description}</h2>
          <div>
            <p>Location</p>
            <p>Address: {location.address}</p>
            <p>City: {location.city}</p>
            <p className={styles.country}>
              <span>Country:</span>
              <span>
                {location.country} {location.flag}
              </span>
            </p>
          </div>
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
