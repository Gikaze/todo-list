/* eslint-disable */
import Spinner from "./../spinner/Spinner";
import TaskItem from "./../taskitem/TaskItem";
import Message from "./../message/Message";
import EventItem from "./../eventitem/EventItem";
import styles from "./EventList.module.css";
//import { useCities } from "../contexts/CitiesContext";

function EventList() {
  //const { cities, isLoading } = useCities();

  const cities = [];
  const isLoading = false;
  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on the city on the map" />
    );

  const countries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country))
      return [
        ...arr,
        { country: city.country, emoji: city.emojy, id: city.id },
      ];
    else return arr;
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.id} />
      ))}
    </ul>
  );
}

export default EventList;
