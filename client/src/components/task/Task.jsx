import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
//import { useCities } from "../contexts/CitiesContext";
import Button from "./../button/Button";
import Spinner from "./../spinner/Spinner";
import styles from "./Task.module.css";

import CustomCheckbox from "react-stylable-checkbox";
import { useTasks } from "../../contexts/TasksContext";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function Task() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { getTask, currentTask, isLoading } = useTasks();

  // TEMP DATA
  useEffect(
    function () {
      getTask(id);
    },
    [id],
  );

  const { title, description, completed, createdAt } = currentTask;

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
          <Button type="primary">Update</Button>
        </div>

        <CustomCheckbox
          size="30px"
          checked={completed}
          sign={"check_white"}
          color={"#21e8e6"}
          onClick={(e) => {
            e.preventDefault();
            console.log("Check-Button Clicked");
          }}
        />
      </div>
    </div>
  );
}

export default Task;
