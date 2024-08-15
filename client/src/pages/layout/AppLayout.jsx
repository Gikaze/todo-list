import AppContent from "./../../components/appcontent/AppContent";
//import Map from "./../../components/map/Map";
import styles from "./AppLayout.module.css";
import User from "./../../components/user/User";
import Map from "./../../components/map/Map";
import { EventsProvider } from "../../contexts/EventsContext";
import { useAuth } from "../../contexts/AuthContext";
//import MyCalendar from "./../../components/calendar/Calendar";

function AppLayout() {
  const { isAuthenticated } = useAuth();
  return (
    <div className={styles.app}>
      <AppContent />
      {isAuthenticated && <User />}
      <EventsProvider>
        <Map />
      </EventsProvider>
      {/*
      
      <MyCalendar /> */}
    </div>
  );
}

export default AppLayout;
