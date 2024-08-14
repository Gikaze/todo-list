import { useNavigate } from "react-router-dom";
import { useEvents } from "../../contexts/EventsContext";
import Spinner from "../spinner/Spinner";
import styles from "./CreateEvent.module.css";
import { useEffect, useState } from "react";
import Button from "../button/Button";
import DatePicker from "react-datepicker";
import { useUrLPosition } from "../../hooks/useUrlPosition";
import Message from "../message/Message";
import { useAuth } from "../../contexts/AuthContext";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const BASE_URL = "https://nominatim.openstreetmap.org/reverse";
const BASE_SEARCH_URL = "https://nominatim.openstreetmap.org/search";

function CreateEvent() {
  const navigate = useNavigate();
  const { createEvent, isLoading } = useEvents();
  const [lat, lng] = useUrLPosition();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [postCode, setPostCode] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [countryFlag, setCountryFlag] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const [geoCodingError, setGeoCodingError] = useState("");
  const [isLoadingGeocoding, setIsLoadingGeoCoding] = useState(false);
  const [user, setUser] = useState({});
  const { currentUser } = useAuth();

  useEffect(
    function () {
      if (currentUser) setUser(currentUser);
    },
    [currentUser],
  );

  useEffect(
    function () {
      if (!lat && !lng) return;
      async function fetchLocationData() {
        try {
          setIsLoadingGeoCoding(true);
          setGeoCodingError("");
          const res = await fetch(
            //`${BASE_URL}?latitude=${lat}&longitude=${lng}`,
            `${BASE_URL}?format=json&lat=${lat}&lon=${lng}&addressdetails=1`,
          );
          const data = await res.json();

          console.log(data.address);

          if (!data.address /*&& !data.city*/)
            throw new Error(
              "That does not seems  to be a city. Please click somewhere else.",
            );

          setAddress(data.address.road || "");
          setHouseNumber(data.address.house_number || "");
          setPostCode(data.address.postcode || "");
          setCity(
            data.address.city ||
              data.address.village ||
              data.address.town ||
              "",
          );
          setState(data.address.state || "");
          setCountry(data.address.country || "");
          setCountryFlag(convertToEmoji(data.address.country_code || ""));
        } catch (err) {
          console.log(err);
          setGeoCodingError(err.message);
        } finally {
          setIsLoadingGeoCoding(false);
        }
      }
      fetchLocationData();
    },
    [lat, lng],
  );

  async function handleSubmit(e) {
    e.preventDefault();
    const data = {
      title,
      description,
      startDate,
      endDate,
      startTime,
      endTime,
      location: {
        address,
        houseNumber,
        postCode,
        city,
        state,
        country,
        countryFlag,
        coordinates: [Number(lat), Number(lng)],
      },
      user: user.id,
    };

    if (!city) return;

    if (!lat || !lng) {
      const res = await fetch(
        `${BASE_SEARCH_URL}?city=${city}&format=json&limit=1`,
      );
      const result = await res.json();

      if (!result) return;

      console.log(result);
      data.location.coordinates = [
        Number(result[0].lat),
        Number(result[0].lon),
      ];
      const { display_name } = result[0];
      const cityInfo = display_name.split(",");

      if (cityInfo.length === 2) {
        data.location.country = cityInfo[1];
      } else if (cityInfo.length === 3) {
        data.location.state = cityInfo[1];
        data.location.country = cityInfo[2];
      } else if (cityInfo.length === 4) {
        data.location.postCode = cityInfo[2];
        data.location.state = cityInfo[1];
        data.location.country = cityInfo[3];
      } else if (cityInfo.length === 5) {
        data.location.postCode = cityInfo[1];
        data.location.state = cityInfo[2];
        data.location.postCode = cityInfo[3];
        data.location.country = cityInfo[4];
      }

      const getCountry = await fetch(
        `${BASE_URL}?format=json&lat=${data.location.coordinates.at(0)}&lon=${data.location.coordinates.at(1)}&addressdetails=1`,
      );
      const resultCountry = await getCountry.json();

      if (!resultCountry) return;

      data.location.countryFlag = convertToEmoji(
        resultCountry.address.country_code || "",
      );
    }

    await createEvent(data);

    navigate("/app/events");
  }

  if (isLoading || isLoadingGeocoding) return <Spinner />;

  if (geoCodingError) return <Message message={geoCodingError} />;

  return (
    <form
      className={`${styles.form} ${styles.isLoading}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.left}>
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

        <div className={styles.row}>
          <label htmlFor="startDate">Start Date</label>
          <DatePicker
            id="startDate"
            onChange={(date) => setStartDate(date)}
            selected={startDate}
            dateFormat="dd/MM/yyy"
          />
        </div>
        <div className={styles.row}>
          <label htmlFor="endDate">End Date</label>
          <DatePicker
            id="endDate"
            onChange={(date) => setEndDate(date)}
            selected={endDate}
            dateFormat="dd/MM/yyy"
          />
        </div>
        <div className={styles.row}>
          <label htmlFor="startTime">Start Time</label>
          <input
            type="time"
            id="startTime"
            onChange={(e) => setStartTime(e.target.value)}
            value={startTime}
          />
        </div>
        <div className={styles.row}>
          <label htmlFor="endTime">End Time</label>
          <input
            type="time"
            id="endTime"
            onChange={(e) => setEndTime(e.target.value)}
            value={endTime}
          />
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.row}>
          <label htmlFor="address">Address</label>
          <input
            id="address"
            onChange={(e) => setAddress(e.target.value)}
            value={address}
          />
        </div>
        <div className={styles.row}>
          <label htmlFor="houseNumber">House Number</label>
          <input
            id="houseNumber"
            onChange={(e) => setHouseNumber(e.target.value)}
            value={houseNumber}
          />
        </div>
        <div className={styles.row}>
          <label htmlFor="postCode">Post Code</label>
          <input
            id="postCode"
            onChange={(e) => setPostCode(e.target.value)}
            value={postCode}
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
          <label htmlFor="state">State</label>
          <input
            id="state"
            onChange={(e) => setState(e.target.value)}
            value={state}
          />
        </div>
        <div className={styles.row}>
          <label htmlFor="country">Country</label>
          <input
            id="country"
            onChange={(e) => setCountry(e.target.value)}
            value={country}
          />
          <span className={styles.flag}>{countryFlag}</span>
        </div>
      </div>

      <div className={styles.buttons}>
        <Button type="secondary">Create</Button>
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

export default CreateEvent;
