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

function EventList() {
  const [userEvents, setUserEvents] = useState([]);
  const { events, isLoading } = useEvents();
  const { currentUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (currentUser && isAuthenticated)
        setUserEvents(events.filter((event) => event.user === currentUser.id));
      else return navigate("/login");
    },
    [events],
  );

  async function handleAddNewEvent(e) {
    e.preventDefault();
    navigate("create");
  }

  if (isLoading) return <Spinner />;

  if (!userEvents.length)
    return (
      <>
        <Message message="Add your first Event by clicking on the map or by using the Add button" />
        <Button type="primary" onClick={handleAddNewEvent}>
          Add
        </Button>
      </>
    );

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
