import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import Spinner from "./../spinner/Spinner";
import styles from "./Event.module.css";

import { useEvents } from "../../contexts/EventsContext";
import Button from "../button/Button";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function Event() {
  const { getEvent, currentEvent, isLoading } = useEvents();
  const { id } = useParams();
  const navigate = useNavigate();

  // TEMP DATA
  useEffect(
    function () {
      getEvent(id);
    },
    [id],
  );

  const currentDate = new Date().toISOString();

  const {
    title,
    description,
    location,
    startDate,

    startTime,
    endTime,
  } = currentEvent;

  console.log(currentEvent);

  function handleChecked(e) {
    e.preventDefault();
    navigate("/app/events");
  }
  function handleUpdate(e) {
    e.preventDefault();
    navigate("/app/events");
  }
  function handleDelete(e) {
    e.preventDefault();
    navigate("/app/events");
  }

  if (isLoading || !location) return <Spinner />;

  return (
    <div className={styles.event}>
      <div className={styles.row}>
        <h6>{title}</h6>
        <h3>
          <span>{description}</span>
        </h3>
        <h2>Location</h2>
        <p>Address: {location.address}</p>
        <p>City: {location.city}</p>
        <p className={styles.country}>
          <span>Country:</span>
          <span>
            {location.country} {"   "} {location.flag}
          </span>
        </p>
      </div>

      <div className={styles.row}>
        <h3>Start: {startTime}</h3>
        <h3>End: {endTime}</h3>
        <p>{formatDate(startDate || null)}</p>
      </div>

      <div className={styles.cta}>
        <div className={styles.buttons}>
          <Button type="back" onClick={() => navigate(-1)}>
            &larr; Back
          </Button>
        </div>
        <button
          className={`${styles.checkedBtn} ${currentEvent.startDate < currentDate ? `${styles.completed}` : ""}`}
          onClick={handleChecked}
        >
          &#10003;
        </button>
        <button className={styles.updateBtn} onClick={handleUpdate}>
          &#9998;
        </button>

        <button className={styles.deleteBtn} onClick={handleDelete}>
          &times;
        </button>
      </div>
    </div>
  );
}

export default Event;
