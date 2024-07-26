import AppContent from "./../../components/appcontent/AppContent";
//import Map from "./../../components/map/Map";
import styles from "./AppLayout.module.css";
import User from "./../../components/user/User";
import MyCalendar from "./../../components/calendar/Calendar";

function AppLayout() {
  return (
    <div className={styles.app}>
      <AppContent />
      {/*<Map />
      <User />
      <MyCalendar /> */}
    </div>
  );
}

export default AppLayout;
