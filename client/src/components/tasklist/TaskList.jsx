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
  //const { user } = useAuth();
  const navigate = useNavigate();

  const user = {
    id: "669e5cc27cfc9e9c10a609b6",
    name: "Gilles",
    email: "romyjeff@googlemail.com",
    password: "pass1234",
    avatar: "https://i.pravatar.cc/100?u=zz",
  };

  useEffect(
    function () {
      setUserTasks(tasks.filter((task) => task.user === user.id));
      //else return navigate("/login");
    },
    [tasks],
  );

  if (isLoading) return <Spinner />;

  if (!tasks.length) return <Message message="Add your first task" />;

  return (
    <ul className={styles.taskList}>
      {userTasks.map((task) => (
        <TaskItem task={task} key={task.id} checked={task.completed} />
      ))}
    </ul>
  );
}

export default TaskList;
