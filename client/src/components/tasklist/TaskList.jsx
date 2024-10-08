/* eslint-disable */
import Spinner from "./../spinner/Spinner";
import TaskItem from "./../taskitem/TaskItem";
import Message from "./../message/Message";
import styles from "./TaskList.module.css";
import { useTasks } from "./../../contexts/TasksContext";
import { useAuth } from "../../contexts/AuthContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../button/Button";

function TaskList() {
  const [userTasks, setUserTasks] = useState([]);
  const { tasks, isLoading } = useTasks();
  const { currentUser, isAuthenticated } = useAuth();
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
      if (currentUser && isAuthenticated)
        setUserTasks(tasks.filter((task) => task.user === currentUser.id));
      else return navigate("/login");
    },
    [tasks],
  );

  async function handleAddNewTask(e) {
    e.preventDefault();
    navigate("create");
  }

  if (isLoading) return <Spinner />;

  if (!tasks.length) return <Message message="Add your first task" />;

  //console.log(currentUser);

  return (
    <>
      <div className={styles.buttons}>
        <Button type="secondary" onClick={handleAddNewTask}>
          Add
        </Button>
      </div>
      <ul className={styles.taskList}>
        {userTasks.map((task) => (
          <TaskItem task={task} key={task.id} />
        ))}
      </ul>
    </>
  );
}

export default TaskList;
