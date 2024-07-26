import { createContext, useContext, useEffect, useReducer } from "react";

const BASE_URL = "http://localhost:5500";

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
        tasks: [...state.events, action.payload],
        currentEvent: action.payload,
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

  async function createEvent(newEvent) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/events`, {
        method: "POST",
        body: JSON.stringify(newEvent),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      dispatch({ type: "event/created", payload: data });
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

  return (
    <EventsContext.Provider
      value={{
        events,
        isLoading,
        currentEvent,
        error,
        getEvent,
        createEvent,
        deleteEvent,
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
