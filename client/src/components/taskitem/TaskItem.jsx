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
  const { id, title, createdAt } = task;

  function handleClick(e) {
    e.preventDefault();

    deleteCity(id);
  }

  return (
    <li>
      <Link
        className={`${styles.taskItem} ${
          id === currentTask._id ? styles["taskItem--active"] : ""
        }`}
        to={id}
      >
        <h3 className={styles.title}>{title}</h3>
        <time className={styles.createdAt}>{formatDate(createdAt)}</time>
        <button className={styles.deleteBtn} onClick={handleClick}>
          &times;
        </button>
      </Link>
    </li>
  );
}

export default TaskItem;
