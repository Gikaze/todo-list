/* eslint-disable */
import { Link, useNavigate, Navigate } from "react-router-dom";
import styles from "./TaskItem.module.css";
import { useTasks } from "../../contexts/TasksContext";
import { useEffect, useState } from "react";

function TaskItem({ task }) {
  const { currentTask, completeTask } = useTasks();
  const { _id: id } = task;
  const [title, setTitle] = useState("");
  const [completed, setCompleted] = useState(false);
  const navigate = useNavigate();

  useEffect(
    function () {
      setTitle(task.title);
      setCompleted(task.completed);
    },
    [task],
  );

  async function handleCompleted(e) {
    e.preventDefault();
    const newCompletedStatus = !completed;
    setCompleted((checked) => !checked);
    await completeTask(id, newCompletedStatus);
    navigate("/app/tasks");
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
        className={`${styles.taskItem} ${
          id === currentTask._id ? styles["taskItem--active"] : ""
        }`}
        to={id}
      >
        <h3 className={styles.title}>{title}</h3>

        <button
          className={`${styles.checkedBtn} ${completed ? `${styles.completed}` : ""}`}
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

export default TaskItem;
