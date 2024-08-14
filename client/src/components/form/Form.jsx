// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useUrLPosition } from "./../../hooks/useUrlPosition";
import Message from "./../message/Message";
import Spinner from "./../spinner/Spinner";
import Button from "./../button/Button";
import styles from "./Form.module.css";

// eslint-disable-next-line react-refresh/only-export-components
export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

//const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";
const BASE_URL = "https://nominatim.openstreetmap.org/reverse";

function Form() {
  const [lat, lng] = useUrLPosition();
  const [isLoadingGeocoding, setIsLoadingGeoCoding] = useState(false);
  const navigate = useNavigate();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [emoji, setEmoji] = useState("");
  const [geoCodingError, setGeoCodingError] = useState("");

  useEffect(
    function () {
      if (!lat && !lng) return;
      async function fetchCityData() {
        try {
          setIsLoadingGeoCoding(true);
          setGeoCodingError("");
          const res = await fetch(
            //`${BASE_URL}?latitude=${lat}&longitude=${lng}`,
            `${BASE_URL}?format=json&lat=${lat}&lon=${lng}&addressdetails=1`,
          );
          const data = await res.json();

          console.log(data);

          if (!data.address /*&& !data.city*/)
            throw new Error(
              "That does not seems  to be a city. Please click somewhere else.",
            );

          setCityName(data.city || data.locality || "");
          setCountry(data.countryName);
          //setEmoji(convertToEmoji(data.countryCode));
        } catch (err) {
          console.log(err);
          setGeoCodingError(err.message);
        } finally {
          setIsLoadingGeoCoding(false);
        }
      }
      fetchCityData();
    },
    [lat, lng],
  );

  async function handleSubmit(e) {
    e.preventDefault();

    if (!cityName || !date) return;

    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat, lng },
    };

    /*await createCity(newCity);
    navigate("/app/cities");
    */
  }

  if (isLoadingGeocoding) return <Spinner />;

  if (!lat && !lng)
    return <Message message="Start by clicking somewhere on the map" />;

  if (geoCodingError) return <Message message={geoCodingError} />;

  return (
    <form
      className={`${styles.form} ${styles.isLoading}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/*<input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />*/}
        <DatePicker
          id="date"
          onChange={(date) => setDate(date)}
          selected={date}
          dateFormat="dd/MM/yyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
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

export default Form;
