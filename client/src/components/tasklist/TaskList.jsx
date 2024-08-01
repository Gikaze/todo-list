/* eslint-disable */
import Spinner from "./../spinner/Spinner";
import TaskItem from "./../taskitem/TaskItem";
import Message from "./../message/Message";
import styles from "./TaskList.module.css";
import { useTasks } from "./../../contexts/TasksContext";
import { useAuth } from "../../contexts/AuthContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function TaskList() {
  const [userTasks, setUserTasks] = useState([]);
  const { tasks, isLoading } = useTasks();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (user) setUserTasks(tasks.filter((task) => task.user === user.id));
      else return navigate("/login");
    },
    [user, tasks],
  );

  if (isLoading) return <Spinner />;

  if (!tasks.length) return <Message message="Add your first task" />;

  return (
    <ul className={styles.taskList}>
      {userTasks.map((task) => (
        <TaskItem task={task} key={task.id} />
      ))}
    </ul>
  );
}

export default TaskList;
