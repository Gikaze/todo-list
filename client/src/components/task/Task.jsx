import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
//import { useCities } from "../contexts/CitiesContext";
import Button from "./../button/Button";
import Spinner from "./../spinner/Spinner";
import styles from "./Task.module.css";

import { useTasks } from "../../contexts/TasksContext";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function Task() {
  const { getTask, currentTask, completeTask, isLoading } = useTasks();
  const { id } = useParams();
  const navigate = useNavigate();
  const [completed, setCompleted] = useState(false);

  // TEMP DATA

  useEffect(
    function () {
      getTask(id);
    },
    [id],
  );

  useEffect(
    function () {
      if (currentTask) {
        setCompleted(currentTask.completed);
      }
    },
    [currentTask],
  );

  async function handleChecked(e) {
    e.preventDefault();
    const newCompletedStatus = !completed;
    setCompleted((checked) => !checked);
    await completeTask(id, newCompletedStatus);
  }

  function handleUpdate(e) {
    e.preventDefault();
    navigate(`/app/tasks/update/${id}`);
  }

  function handleDelete(e) {
    e.preventDefault();
    navigate(`/app/tasks/delete/${id}`);
  }

  const { title, description, createdAt } = currentTask;

  if (isLoading) return <Spinner />;

  return (
    <div className={styles.task}>
      <div className={styles.row}>
        <h6>{title}</h6>
        <h3>
          <span>{description}</span>
        </h3>
      </div>

      <div className={styles.row}>
        <p>{formatDate(createdAt || null)}</p>
      </div>

      <div className={styles.cta}>
        <div className={styles.buttons}>
          <Button type="back" onClick={() => navigate(-1)}>
            &larr; Back
          </Button>
        </div>

        <div className={styles.cta}>
          <button
            className={`${styles.checkedBtn} ${completed ? `${styles.completed}` : ""}`}
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
    </div>
  );
}

export default Task;
