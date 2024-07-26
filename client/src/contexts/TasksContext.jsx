import { createContext, useContext, useEffect, useReducer } from "react";

const BASE_URL = "http://localhost:5500";

const TasksContext = createContext();

const initialState = {
  tasks: [],
  isLoading: false,
  currentTask: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "tasks/loaded":
      return { ...state, isLoading: false, tasks: action.payload };

    case "task/loaded":
      return { ...state, isLoading: false, currentTask: action.payload };

    case "task/created":
      return {
        ...state,
        isLoading: false,
        tasks: [...state.tasks, action.payload],
        currentTask: action.payload,
      };
    case "task/deleted":
      return {
        ...state,
        isLoading: false,
        tasks: [...state.tasks].filter((task) => task.id !== action.payload),
        currentTask: {},
      };
    case "rejected":
      return { ...state, isLoading: false, error: action.payload };
    default:
      throw new Error("This action is not covered");
  }
}

// eslint-disable-next-line react/prop-types
function TasksProvider({ children }) {
  // Using ContextApI with Reducer

  const [{ tasks, isLoading, currentTask, error }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  useEffect(function () {
    async function fetchTasks() {
      dispatch({ type: "loading" });
      try {
        const res = await fetch(`${BASE_URL}/tasks`);
        const data = await res.json();
        dispatch({ type: "tasks/loaded", payload: data });
      } catch (err) {
        dispatch({
          type: "rejected",
          payload: `There was an error loading data: ${err.message}`,
        });
      }
    }
    fetchTasks();
  }, []);

  async function getTask(id) {
    if (Number(id) === currentTask.id) return;

    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/tasks/${id}`);
      const data = await res.json();
      dispatch({ type: "task/loaded", payload: data });
    } catch (err) {
      dispatch({
        type: "rejected",
        payload: `There was an error loading data: ${err.message}`,
      });
    }
  }

  async function createTask(newTask) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/tasks`, {
        method: "POST",
        body: JSON.stringify(newTask),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      dispatch({ type: "task/created", payload: data });
    } catch (err) {
      dispatch({
        type: "rejected",
        payload: `There was an error loading data: ${err.message}`,
      });
    }
  }

  async function deleteTask(id) {
    dispatch({ type: "loading" });
    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });

      dispatch({
        type: "task/deleted",
        payload: id,
      });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <TasksContext.Provider
      value={{
        tasks,
        isLoading,
        currentTask,
        error,
        getTask,
        createTask,
        deleteTask,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
}

function useTasks() {
  const context = useContext(TasksContext);
  if (context === undefined)
    throw new Error("TasksContext was not used in the TasksProvider scope");

  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { TasksProvider, useTasks };
