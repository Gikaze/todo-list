/* eslint-disable */
import { Link } from "react-router-dom";
import styles from "./TaskItem.module.css";
import { useTasks } from "../../contexts/TasksContext";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

function TaskItem({ task }) {
  const { currentTask, deleteTask } = useTasks();
  const { id, title, createdAt, completed } = task;

  function handleClick(e) {
    e.preventDefault();

    deleteCity(id);
  }

  function handleChecked(e) {
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
        className={`${styles.taskItem} ${
          id === currentTask.id ? styles["taskItem--active"] : ""
        }`}
        to={id}
      >
        <h3 className={styles.title}>{title}</h3>

        <button
          className={`${styles.checkedBtn} ${completed ? "completed" : ""}`}
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
      </Link>
    </li>
  );
}

export default TaskItem;
