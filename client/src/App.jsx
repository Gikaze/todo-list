import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./contexts/AuthContext";
import { EventsProvider } from "./contexts/EventsContext";
import { TasksProvider } from "./contexts/TasksContext";

import AppLayout from "./pages/layout/AppLayout";
import Homepage from "./pages/homepage/Homepage";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import PageNotFound from "./pages/pageNotFound/PageNotFound";

import Form from "./components/form/Form";
import TaskList from "./components/tasklist/TaskList";
import Task from "./components/task/Task";
import EventList from "./components/eventlist/EventList";
import Event from "./components/event/Event";
import ChatIA from "./components/chatia/ChatIA";
import FormTask from "./components/formTask/FormTask";
import CreateTask from "./components/createTask/CreateTask";
import FormEvent from "./components/formEvent/FormEvent";
import DeleteTask from "./components/deleteTask/DeleteTask";
import DeleteEvent from "./components/deleteEvent/DeleteEvent";
import CreateEvent from "./components/createEvent/CreateEvent";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<Homepage />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="chatia" element={<ChatIA />} />
          <Route path="app" element={<AppLayout />}>
            <Route
              path="tasks"
              element={
                <TasksProvider>
                  <TaskList />
                </TasksProvider>
              }
            />
            <Route
              path="tasks/create"
              element={
                <TasksProvider>
                  <CreateTask />
                </TasksProvider>
              }
            />

            <Route
              path="tasks/:id"
              element={
                <TasksProvider>
                  <Task />
                </TasksProvider>
              }
            />
            <Route
              path="tasks/update/:id"
              element={
                <TasksProvider>
                  <FormTask />
                </TasksProvider>
              }
            />
            <Route
              path="tasks/delete/:id"
              element={
                <TasksProvider>
                  <DeleteTask />
                </TasksProvider>
              }
            />
            <Route
              path="events"
              element={
                <EventsProvider>
                  <EventList />
                </EventsProvider>
              }
            />
            <Route
              path="events/create"
              element={
                <EventsProvider>
                  <CreateEvent />
                </EventsProvider>
              }
            />
            <Route
              path="events/:id"
              element={
                <EventsProvider>
                  <Event />
                </EventsProvider>
              }
            />
            <Route
              path="events/update/:id"
              element={
                <EventsProvider>
                  <FormEvent />
                </EventsProvider>
              }
            />
            <Route
              path="events/delete/:id"
              element={
                <EventsProvider>
                  <DeleteEvent />
                </EventsProvider>
              }
            />
            <Route path="form" element={<Form />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
