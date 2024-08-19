import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";

const BASE_URL = "http://localhost:3000/api/v1/events";

const EventsContext = createContext();

const initialState = {
  events: [],
  isLoading: false,
  currentEvent: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "events/loaded":
      return { ...state, isLoading: false, events: action.payload.data };

    case "event/loaded":
      return { ...state, isLoading: false, currentEvent: action.payload.data };

    case "event/created":
      return {
        ...state,
        isLoading: false,
        events: [action.payload.data, ...state.events],
        currentEvent: action.payload.data,
      };
    case "event/updated":
      return {
        ...state,
        isLoading: false,
        events: [...state.events].map((event) =>
          event._id !== action.payload.id
            ? event
            : {
                ...event,
                title: action.payload.userData.title || event.title,
                description:
                  action.payload.userData.description || event.description,
                startDate: action.payload.userData.startDate || event.startDate,
                endDate: action.payload.userData.endDate || event.endDate,
                startTime: action.payload.userData.startTime || event.startTime,
                endTime: action.payload.userData.endTime || event.endTime,
                location: {
                  address: action.payload.userData.location.address,
                  houseNumber: action.payload.userData.location.houseNumber,
                  postCode: action.payload.userData.location.postCode,
                  city: action.payload.userData.location.city,
                  state: action.payload.userData.location.state,
                  country: action.payload.userData.location.country,
                  countryFlag: action.payload.userData.location.countryFlag,
                  coordinates:
                    action.payload.userData.location.coordinates ||
                    event.location.coordinates,
                },
              },
        ),
      };
    case "event/deleted":
      return {
        ...state,
        isLoading: false,
        events: [...state.events].filter(
          (event) => event._id !== action.payload,
        ),
        currentEvent: {},
      };
    case "rejected":
      return { ...state, isLoading: false, error: action.payload };
    default:
      throw new Error("This action is not covered");
  }
}

// eslint-disable-next-line react/prop-types
function EventsProvider({ children }) {
  // Using ContextApI with Reducer

  const [{ events, isLoading, currentEvent, error }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  useEffect(function () {
    async function fetchEvents() {
      dispatch({ type: "loading" });
      try {
        const res = await axios({
          method: "GET",
          url: BASE_URL,
          withCredentials: true,
        });

        const data = res.data.data;
        dispatch({ type: "events/loaded", payload: data });
      } catch (err) {
        dispatch({
          type: "rejected",
          payload: err.response.data.message,
        });
      }
    }
    fetchEvents();
  }, []);

  async function getEvents() {
    dispatch({ type: "loading" });
    try {
      const res = await axios({
        method: "GET",
        url: BASE_URL,
        withCredentials: true,
      });

      const data = res.data.data;
      dispatch({ type: "events/loaded", payload: data });
    } catch (err) {
      dispatch({
        type: "rejected",
        payload: err.response.data.message,
      });
    }
  }

  async function getEvent(id) {
    if (Number(id) === currentEvent.id) return;

    dispatch({ type: "loading" });
    try {
      const res = await axios({
        method: "GET",
        url: `${BASE_URL}/${id}`,
        withCredentials: true,
      });
      const data = res.data.data;
      dispatch({ type: "event/loaded", payload: data });
    } catch (err) {
      dispatch({
        type: "rejected",
        payload: err.response.data.message,
      });
    }
  }

  async function createEvent(userData) {
    dispatch({ type: "loading" });
    try {
      const newEvent = {
        title: userData.title,
        description: userData.description,
        startDate: userData.startDate,
        endDate: userData.endDate,
        startTime: userData.startTime,
        endTime: userData.endTime,
        location: userData.location,
        user: userData.user,
      };

      const res = await axios({
        method: "POST",
        url: BASE_URL,
        data: newEvent,
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = res.data.data;

      dispatch({ type: "event/created", payload: data });
    } catch (err) {
      dispatch({
        type: "rejected",
        payload: err.response.data.message,
      });
    }
  }

  async function deleteEvent(id) {
    dispatch({ type: "loading" });
    try {
      await axios({
        method: "DELETE",
        url: `${BASE_URL}/${id}`,
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      dispatch({
        type: "event/deleted",
        payload: id,
      });
    } catch (err) {
      dispatch({
        type: "rejected",
        payload: err.response.data.message,
      });
    }
  }

  async function updateEvent(id, userData) {
    dispatch({ type: "loading" });
    try {
      await axios({
        method: "PATCH",
        url: `${BASE_URL}/${id}`,
        data: userData,
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      dispatch({
        type: "event/updated",
        payload: { id, userData },
      });
    } catch (err) {
      dispatch({
        type: "rejected",
        payload: err.response.data.message,
      });
    }
  }

  return (
    <EventsContext.Provider
      value={{
        events,
        isLoading,
        currentEvent,
        error,
        getEvents,
        getEvent,
        createEvent,
        deleteEvent,
        updateEvent,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
}

function useEvents() {
  const context = useContext(EventsContext);
  if (context === undefined)
    throw new Error("EventsContext was not used in the TasksProvider scope");

  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { EventsProvider, useEvents };
