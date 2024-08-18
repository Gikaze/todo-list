import { createContext, useContext, useEffect, useReducer } from "react";
import { v4 as uuidv4 } from "uuid";

const BASE_URL = "http://localhost:5000";

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
        tasks: [action.payload, ...state.tasks],
        currentTask: action.payload,
      };
    case "task/deleted":
      return {
        ...state,
        isLoading: false,
        tasks: [...state.tasks].filter((task) => task.id !== action.payload),
        currentTask: {},
      };
    case "task/completed":
      return {
        ...state,
        isLoading: false,
        tasks: [...state.tasks].map((task) =>
          task.id !== action.payload.id
            ? task
            : { ...task, completed: action.payload.completed },
        ),
      };
    case "task/updated":
      return {
        ...state,
        isLoading: false,
        tasks: [...state.tasks].map((task) =>
          task.id !== action.payload.id
            ? task
            : {
                ...task,
                title: action.payload.data.title || task.title,
                description:
                  action.payload.data.description || task.description,
                completed: action.payload.data.completed || task.completed,
              },
        ),
      };

    case "rejected":
      return { ...state, isLoading: false, error: action.payload };
    default:
      throw new Error("This action is not covered");
  }
}

// eslint-disable-next-line react/prop-types
function TasksProvider({ children }) {
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

  async function createTask(data) {
    dispatch({ type: "loading" });
    try {
      const newTask = {
        id: uuidv4(),
        title: data.title,
        description: data.description,
        completed: false,
        createdAt: new Date().toISOString(),
        user: data.user,
      };
      await fetch(`${BASE_URL}/tasks`, {
        method: "POST",
        body: JSON.stringify(newTask),
        headers: {
          "Content-Type": "application/json",
        },
      });

      dispatch({ type: "task/created", payload: newTask });
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
      await fetch(`${BASE_URL}/tasks/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      dispatch({
        type: "task/deleted",
        payload: id,
      });
    } catch (err) {
      console.log(err);
    }
  }

  async function completeTask(id, completed) {
    dispatch({ type: "loading" });
    try {
      await fetch(`${BASE_URL}/tasks/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ completed }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      dispatch({
        type: "task/completed",
        payload: { id, completed },
      });
    } catch (err) {
      console.log(err);
    }
  }

  async function updateTask(id, data) {
    dispatch({ type: "loading" });
    try {
      await fetch(`${BASE_URL}/tasks/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      dispatch({
        type: "task/updated",
        payload: { id, data },
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
        completeTask,
        deleteTask,
        updateTask,
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
