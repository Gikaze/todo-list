import { BrowserRouter, Routes, Route } from "react-router-dom";

import Form from "./components/form/Form";
import TaskList from "./components/tasklist/TaskList";
import Task from "./components/task/Task";
import EventList from "./components/eventlist/EventList";
import Event from "./components/event/Event";
import ChatIA from "./components/chatia/ChatIA";
import MyCalendar from "./components/calendar/Calendar";
import Map from "./components/map/Map";

import AppLayout from "./pages/layout/AppLayout";
import Homepage from "./pages/homepage/Homepage";
import Login from "./pages/login/Login";
import PageNotFound from "./pages/pageNotFound/PageNotFound";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<Homepage />} />
          <Route path="login" element={<Login />} />
          <Route path="chatia" element={<ChatIA />} />
          <Route path="app" element={<AppLayout />}>
            <Route path="tasks" element={<TaskList />} />
            <Route path="tasks/:id" element={<Task />} />
            <Route path="events" element={<EventList />} />
            <Route path="events/:id" element={<Event />} />
            <Route path="map" element={<Map />} />
            <Route path="calendar" element={<MyCalendar />} />
            <Route path="form" element={<Form />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
