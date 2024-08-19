import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";

const BASE_URL = "http://localhost:3000/api/v1/tasks";

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
      return { ...state, isLoading: false, tasks: action.payload.data };

    case "task/loaded":
      return { ...state, isLoading: false, currentTask: action.payload.data };

    case "task/created":
      return {
        ...state,
        isLoading: false,
        tasks: [action.payload.data, ...state.tasks],
        currentTask: action.payload.data,
      };
    case "task/deleted":
      return {
        ...state,
        isLoading: false,
        tasks: [...state.tasks].filter((task) => task._id !== action.payload),
        currentTask: {},
      };
    case "task/completed":
      return {
        ...state,
        isLoading: false,
        tasks: [...state.tasks].map((task) =>
          task._id !== action.payload.id
            ? task
            : { ...task, completed: action.payload.completed },
        ),
      };
    case "task/updated":
      return {
        ...state,
        isLoading: false,
        tasks: [...state.tasks].map((task) =>
          task._id !== action.payload.id
            ? task
            : {
                ...task,
                title: action.payload.userData.title || task.title,
                description:
                  action.payload.userData.description || task.description,
                completed: action.payload.userData.completed || task.completed,
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
        const res = await axios({
          method: "GET",
          url: BASE_URL,
          withCredentials: true,
        });

        const data = res.data.data;
        dispatch({ type: "tasks/loaded", payload: data });
      } catch (err) {
        dispatch({
          type: "rejected",
          payload: err.response.data.message,
        });
      }
    }
    fetchTasks();
  }, []);

  async function getTasks() {
    dispatch({ type: "loading" });
    try {
      const res = await axios({
        method: "GET",
        url: BASE_URL,
        withCredentials: true,
      });

      const data = res.data.data;
      dispatch({ type: "tasks/loaded", payload: data });
    } catch (err) {
      dispatch({
        type: "rejected",
        payload: err.response.data.message,
      });
    }
  }

  async function getTask(id) {
    if (Number(id) === currentTask.id) return;

    dispatch({ type: "loading" });
    try {
      const res = await axios({
        method: "GET",
        url: `${BASE_URL}/${id}`,
        withCredentials: true,
      });
      const data = res.data.data;
      dispatch({ type: "task/loaded", payload: data });
    } catch (err) {
      dispatch({
        type: "rejected",
        payload: err.response.data.message,
      });
    }
  }

  async function createTask(userData) {
    dispatch({ type: "loading" });
    try {
      const newTask = {
        title: userData.title,
        description: userData.description,
        completed: false,
        user: userData.user,
      };

      const res = await axios({
        method: "POST",
        url: BASE_URL,
        data: newTask,
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = res.data.data;

      dispatch({ type: "task/created", payload: data });
    } catch (err) {
      dispatch({
        type: "rejected",
        payload: err.response.data.message,
      });
    }
  }

  async function deleteTask(id) {
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
        type: "task/deleted",
        payload: id,
      });
    } catch (err) {
      dispatch({
        type: "rejected",
        payload: err.response.data.message,
      });
    }
  }

  async function completeTask(id, completed) {
    dispatch({ type: "loading" });
    try {
      await axios({
        method: "PATCH",
        url: `${BASE_URL}/${id}`,
        data: { completed },
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      dispatch({
        type: "task/completed",
        payload: { id, completed },
      });
    } catch (err) {
      dispatch({
        type: "rejected",
        payload: err.response.data.message,
      });
    }
  }

  async function updateTask(id, userData) {
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
        type: "task/updated",
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
    <TasksContext.Provider
      value={{
        tasks,
        isLoading,
        currentTask,
        error,
        getTasks,
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
