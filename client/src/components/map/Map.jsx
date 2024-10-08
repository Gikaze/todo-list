import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import styles from "./Map.module.css";

import { useGeolocation } from "./../../hooks/useGeolocation";
import { useUrLPosition } from "./../../hooks/useUrlPosition";
import Button from "./../button/Button";
import { useEvents } from "../../contexts/EventsContext";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

const user = {
  id: "669e5cc27cfc9e9c10a609b6",
  name: "Gilles",
  email: "romyjeff@googlemail.com",
  password: "pass1234",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

function Map() {
  const [userEvents, setUserEvents] = useState([]);
  const { events, getEvents } = useEvents();
  //const { user } = useAuth();

  const [mapPosition, setMapPosition] = useState([40, 0]);

  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation();

  const [mapLat, mapLng] = useUrLPosition();

  useEffect(
    function () {
      getEvents();
      if (events.length > 0)
        setUserEvents(events.filter((event) => event.user === user.id));
      //else return navigate("/login");
    },
    [events],
  );

  useEffect(
    function () {
      if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
    },
    [mapLat, mapLng],
  );

  useEffect(
    function () {
      if (geolocationPosition)
        setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
    },
    [geolocationPosition],
  );

  return (
    <div className={styles.mapContainer}>
      {!geolocationPosition && (
        <Button type="position" onClick={getPosition}>
          {isLoadingPosition ? "Loading..." : "Use your position"}
        </Button>
      )}
      <MapContainer
        center={mapPosition}
        //center={[mapLat, mapLng]}
        zoom={8}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {userEvents.length > 0 &&
          userEvents.map((event) => (
            <Marker
              position={[
                event.location.coordinates.at(0),
                event.location.coordinates.at(1),
              ]}
              key={event.id}
            >
              <Popup>
                <div className={styles.row}>
                  <h3>Date: {formatDate(event.startDate || null)}</h3>
                  <h3>
                    Time: {event.startTime} - {event.endTime}
                  </h3>
                  <span>{event.location.address}</span>
                  <span>{event.location.city}</span>
                  <span>
                    {event.location.country} {event.location.flag}
                  </span>
                </div>
              </Popup>
            </Marker>
          ))}
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

// eslint-disable-next-line react/prop-types
function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  const { id } = useParams();
  useMapEvents({
    click: (e) =>
      id
        ? navigate(
            `events/update/${id}?lat=${e.latlng.lat}&lng=${e.latlng.lng}`,
          )
        : navigate(`events/create?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
  return null;
}

export default Map;
