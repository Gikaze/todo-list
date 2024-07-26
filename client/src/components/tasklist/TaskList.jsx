/* eslint-disable */
import Spinner from "./../spinner/Spinner";
import TaskItem from "./../taskitem/TaskItem";
import Message from "./../message/Message";
import styles from "./TaskList.module.css";
//import { useCities } from "../contexts/CitiesContext";

function TaskList() {
  //const { cities, isLoading } = useCities();
  const cities = [];
  const isLoading = false;
  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on the city on the map" />
    );

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <TaskItem city={city} key={city.id} />
      ))}
    </ul>
  );
}

export default TaskList;
