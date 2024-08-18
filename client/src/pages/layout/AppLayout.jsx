import AppContent from "./../../components/appcontent/AppContent";
import styles from "./AppLayout.module.css";
import Map from "./../../components/map/Map";
import { EventsProvider } from "../../contexts/EventsContext";

function AppLayout() {
  return (
    <div className={styles.app}>
      <div className={styles.appContent}>
        <AppContent />
      </div>

      <EventsProvider>
        <Map />
      </EventsProvider>
    </div>
  );
}

export default AppLayout;
