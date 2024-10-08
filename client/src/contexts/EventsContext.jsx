import { createContext, useContext, useEffect, useReducer } from "react";
import { v4 as uuidv4 } from "uuid";

const BASE_URL = "http://localhost:5080";

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
      return { ...state, isLoading: false, events: action.payload };

    case "event/loaded":
      return { ...state, isLoading: false, currentEvent: action.payload };

    case "event/created":
      return {
        ...state,
        isLoading: false,
        events: [...state.events, action.payload],
        currentEvent: action.payload,
      };
    case "event/updated":
      return {
        ...state,
        isLoading: false,
        events: [...state.events].map((event) =>
          event.id !== action.payload.id
            ? event
            : {
                ...event,
                title: action.payload.data.title || event.title,
                description:
                  action.payload.data.description || event.description,
                startDate: action.payload.data.startDate || event.startDate,
                endDate: action.payload.data.endDate || event.endDate,
                startTime: action.payload.data.startTime || event.startTime,
                endTime: action.payload.data.endTime || event.endTime,
                location: {
                  address: action.payload.data.location.address,
                  houseNumber: action.payload.data.location.houseNumber,
                  postCode: action.payload.data.location.postCode,
                  city: action.payload.data.location.city,
                  state: action.payload.data.location.state,
                  country: action.payload.data.location.country,
                  countryFlag: action.payload.data.location.countryFlag,
                  coordinates:
                    action.payload.data.location.coordinates ||
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
          (event) => event.id !== action.payload,
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
        const res = await fetch(`${BASE_URL}/events`);
        const data = await res.json();
        dispatch({ type: "events/loaded", payload: data });
      } catch (err) {
        dispatch({
          type: "rejected",
          payload: `There was an error loading data: ${err.message}`,
        });
      }
    }
    fetchEvents();
  }, []);

  async function getEvents() {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/events`);
      const data = await res.json();
      dispatch({ type: "events/loaded", payload: data });
    } catch (err) {
      dispatch({
        type: "rejected",
        payload: `There was an error loading data: ${err.message}`,
      });
    }
  }

  async function getEvent(id) {
    if (Number(id) === currentEvent.id) return;

    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/events/${id}`);
      const data = await res.json();
      dispatch({ type: "event/loaded", payload: data });
    } catch (err) {
      dispatch({
        type: "rejected",
        payload: `There was an error loading data: ${err.message}`,
      });
    }
  }

  async function createEvent(data) {
    dispatch({ type: "loading" });
    try {
      const newEvent = {
        id: uuidv4(),
        title: data.title,
        description: data.description,
        startDate: data.startDate,
        endDate: data.endDate,
        startTime: data.startTime,
        endTime: data.endTime,
        location: data.location,
        user: data.user,
      };

      await fetch(`${BASE_URL}/events`, {
        method: "POST",
        body: JSON.stringify(newEvent),
        headers: {
          "Content-Type": "application/json",
        },
      });

      dispatch({ type: "event/created", payload: newEvent });
    } catch (err) {
      dispatch({
        type: "rejected",
        payload: `There was an error loading data: ${err.message}`,
      });
    }
  }

  async function deleteEvent(id) {
    dispatch({ type: "loading" });
    try {
      await fetch(`${BASE_URL}/events/${id}`, {
        method: "DELETE",
      });

      dispatch({
        type: "event/deleted",
        payload: id,
      });
    } catch (err) {
      console.log(err);
    }
  }

  async function updateEvent(id, data) {
    dispatch({ type: "loading" });
    try {
      await fetch(`${BASE_URL}/events/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      dispatch({
        type: "event/updated",
        payload: { id, data },
      });
    } catch (err) {
      console.log(err);
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
