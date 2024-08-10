import { useNavigate, useParams } from "react-router-dom";
import { useTasks } from "../../contexts/TasksContext";
import { useEffect, useState } from "react";
import Spinner from "../spinner/Spinner";
import Button from "../button/Button";
import styles from "./DeleteTask.module.css";

function DeleteTask() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const { deleteTask } = useTasks();
  const { id } = useParams();
  const { getTask, isLoading, currentTask } = useTasks();

  useEffect(
    function () {
      async function getCurrentTask() {
        await getTask(id);
      }
      getCurrentTask();
    },
    [id],
  );

  useEffect(
    function () {
      if (currentTask) {
        setTitle(currentTask.title);
      }
    },
    [currentTask],
  );

  async function handleSubmit(e) {
    e.preventDefault();
    await deleteTask(id);
    navigate("/app/tasks");
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

export default DeleteTask;
