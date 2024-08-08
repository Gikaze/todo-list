import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./FormTask.module.css";
import Button from "../button/Button";
import { useTasks } from "../../contexts/TasksContext";
import Spinner from "../spinner/Spinner";

function FormTask() {
  const navigate = useNavigate();
  const { updateTask } = useTasks();
  const { id } = useParams();
  const { getTask, currentTask, isLoading } = useTasks();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);

  useEffect(
    function () {
      async function getCurrentTask() {
        await getTask(id);
      }
      getCurrentTask();
    },
    [id],
  );

  useEffect(() => {
    if (currentTask) {
      setTitle(currentTask.title || "");
      setDescription(currentTask.description || "");
      setCompleted(currentTask.completed);
    }
  }, [currentTask]);

  function handleChecked(e) {
    e.preventDefault();
    setCompleted((checked) => !checked);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const data = {
      title: title,
      description: description,
      completed: completed,
    };
    await updateTask(id, data);
    navigate(-1);
  }

  if (isLoading) return <Spinner />;

  return (
    <form
      className={`${styles.form} ${styles.isLoading}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="description">Description</label>
        <input
          id="description"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
      </div>
      <div className={styles.buttons}>
        <label htmlFor="completed">Completed</label>
        <button
          className={`${styles.checkedBtn} ${completed ? `${styles.completed}` : ""}`}
          onChange={(e) => setCompleted(e.target.value)}
          value={completed}
          onClick={handleChecked}
        >
          &#10003;
        </button>
      </div>

      <div className={styles.buttons}>
        <Button type="secondary">Save</Button>
        <Button
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
          type="back"
        >
          &larr; Back
        </Button>
      </div>
    </form>
  );
}

export default FormTask;
