import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CreateTask.module.css";
import { useTasks } from "../../contexts/TasksContext";
import { useAuth } from "../../contexts/AuthContext";
import Spinner from "../spinner/Spinner";
import Button from "../button/Button";

function CreateTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [user, setUser] = useState({});
  const { createTask, isLoading } = useTasks();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  useEffect(
    function () {
      if (currentUser) setUser(currentUser);
    },
    [currentUser],
  );

  async function handleSubmit(e) {
    e.preventDefault();
    const data = {
      title: title,
      description: description,
      completed: false,
      user: user.id,
    };
    await createTask(data);
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
        <Button type="secondary">Create</Button>
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

export default CreateTask;
