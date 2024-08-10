import { useNavigate } from "react-router-dom";
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

function Map() {
  const [userEvents, setUserEvents] = useState([]);
  const { events } = useEvents();
  //const { user } = useAuth();

  const user = {
    id: "669e5cc27cfc9e9c10a609b6",
    name: "Gilles",
    email: "romyjeff@googlemail.com",
    password: "pass1234",
    avatar: "https://i.pravatar.cc/100?u=zz",
  };

  useEffect(
    function () {
      setUserEvents(events.filter((event) => event.user === user.id));
      //else return navigate("/login");
    },
    [events],
  );

  const [mapPosition, setMapPosition] = useState([40, 0]);

  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation();

  const [mapLat, mapLng] = useUrLPosition();

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

  //if (!mapPosition) return;

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
        zoom={6}
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
                <span>{event.location.flag}</span>
                <span>{event.location.city}</span>
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
  useMapEvents({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
  return null;
}

export default Map;
