import { useNavigate, useParams } from "react-router-dom";
import { useEvents } from "../../contexts/EventsContext";
import { useEffect, useState } from "react";
import styles from "./DeleteEvent.module.css";
import Spinner from "../spinner/Spinner";
import Button from "../button/Button";

function DeleteEvent() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const { deleteEvent } = useEvents();
  const { id } = useParams();
  const { getEvent, isLoading, currentEvent, getEvents } = useEvents();

  useEffect(
    function () {
      async function getCurrentEvent() {
        await getEvent(id);
      }
      getCurrentEvent();
    },
    [id],
  );

  useEffect(
    function () {
      if (currentEvent) {
        setTitle(currentEvent.title);
      }
    },
    [currentEvent],
  );

  async function handleSubmit(e) {
    e.preventDefault();
    await deleteEvent(id);
    await getEvents();
    navigate("/app/events");
  }

  if (isLoading) return <Spinner />;
  return (
    <form
      className={`${styles.delete} ${styles.isLoading}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <h2>Confirm Delete</h2>
        <h3>
          <span>{title}</span>
        </h3>
      </div>

      <div className={styles.buttons}>
        <Button type="delete">Delete</Button>
        <Button
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
          type="back"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}

export default DeleteEvent;
