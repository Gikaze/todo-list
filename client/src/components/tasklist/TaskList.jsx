/* eslint-disable */
import Spinner from "./../spinner/Spinner";
import TaskItem from "./../taskitem/TaskItem";
import Message from "./../message/Message";
import styles from "./TaskList.module.css";
import { useTasks } from "./../../contexts/TasksContext";

function TaskList() {
  const { tasks, isLoading } = useTasks();

  console.log(tasks);

  if (isLoading) return <Spinner />;

  if (!tasks.length) return <Message message="Add your first task" />;

  return (
    <ul className={styles.taskList}>
      {tasks.map((task) => (
        <TaskItem task={task} key={task.id} />
      ))}
    </ul>
  );
}

export default TaskList;
