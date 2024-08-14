/* eslint-disable */
import Spinner from "./../spinner/Spinner";
import Message from "./../message/Message";
import EventItem from "./../eventitem/EventItem";

import { useAuth } from "../../contexts/AuthContext";
import { useEvents } from "../../contexts/EventsContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../button/Button";
import styles from "./EventList.module.css";
//import { useCities } from "../contexts/CitiesContext";

function EventList() {
  const [userEvents, setUserEvents] = useState([]);
  const { events, isLoading } = useEvents();
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
      if (events.length > 0)
        setUserEvents(events.filter((event) => event.user === user.id));
      //else return navigate("/login");
    },
    [events],
  );

  async function handleAddNewEvent(e) {
    e.preventDefault();
    navigate("create");
  }

  if (isLoading || !userEvents.length) return <Spinner />;

  if (!events.length) return <Message message="Add your first Event" />;

  return (
    <>
      <div className={styles.buttons}>
        <Button type="primary" onClick={handleAddNewEvent}>
          Add
        </Button>
      </div>
      <ul className={styles.eventList}>
        {userEvents.map((event) => (
          <EventItem event={event} key={event.id} />
        ))}
      </ul>
    </>
  );
}

export default EventList;
