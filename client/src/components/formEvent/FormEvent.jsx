import { useNavigate, useParams } from "react-router-dom";
import { useEvents } from "../../contexts/EventsContext";
import Spinner from "../spinner/Spinner";
import styles from "./FormEvent.module.css";
import { useEffect, useState } from "react";
import Button from "../button/Button";

function FormEvent() {
  const navigate = useNavigate();
  const { updateEvent } = useEvents();
  const { id } = useParams();
  const { getEvent, currentEvent, isLoading } = useEvents();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  /*const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");*/
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  useEffect(
    function () {
      async function getCurrentEvent() {
        await getEvent(id);
      }
      getCurrentEvent();
    },
    [id],
  );

  useEffect(() => {
    if (currentEvent && currentEvent.location) {
      setTitle(currentEvent.title || "");
      setDescription(currentEvent.description || "");
      /*setAddress(currentEvent.location.address || "");
      setCity(currentEvent.location.city || "");
      setCountry(currentEvent.location.country || "");*/
      setStartDate(currentEvent.startDate || "");
      setEndDate(currentEvent.endDate || "");
      setStartTime(currentEvent.startTime || "");
      setEndTime(currentEvent.endTime || "");
    }
  }, [currentEvent]);

  async function handleSubmit(e) {
    e.preventDefault();
    const data = {
      title: title,
      description: description,
      /*address,
      city,
      country,*/
      startDate,
      endDate,
      startTime,
      endTime,
    };
    await updateEvent(id, data);

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
      {/*<div className={styles.row}>
        <label htmlFor="address">Address</label>
        <input
          id="address"
          onChange={(e) => setAddress(e.target.value)}
          value={address}
        />
      </div>
      <div className={styles.row}>
        <label htmlFor="city">City</label>
        <input
          id="city"
          onChange={(e) => setCity(e.target.value)}
          value={city}
        />
      </div>
      <div className={styles.row}>
        <label htmlFor="country">Country</label>
        <input
          id="country"
          onChange={(e) => setCountry(e.target.value)}
          value={country}
        />
      </div>*/}
      <div className={styles.row}>
        <label htmlFor="startDate">Start Date</label>
        <input
          id="startDate"
          onChange={(e) => setStartDate(e.target.value)}
          value={startDate}
        />
      </div>
      <div className={styles.row}>
        <label htmlFor="endDate">End Date</label>
        <input
          id="endDate"
          onChange={(e) => setEndDate(e.target.value)}
          value={endDate}
        />
      </div>
      <div className={styles.row}>
        <label htmlFor="startTime">Start Time</label>
        <input
          id="startTime"
          onChange={(e) => setStartTime(e.target.value)}
          value={startTime}
        />
      </div>
      <div className={styles.row}>
        <label htmlFor="endTime">End Time</label>
        <input
          id="endTime"
          onChange={(e) => setEndTime(e.target.value)}
          value={endTime}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="secondary">save</Button>
        <Button
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
          type="back"
        >
          &larr; Back
        </Button>
      </div>
    </form>
  );
}

export default FormEvent;
