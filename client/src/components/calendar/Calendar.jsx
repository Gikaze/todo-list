import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const MyCalendar = () => {
  const [date, setDate] = useState(new Date());

  const onChange = (newDate) => {
    setDate(newDate);
  };

  return (
    <div>
      <Calendar onChange={onChange} value={date} />
      <p>Date sélectionnée : {date.toDateString()}</p>
    </div>
  );
};

export default MyCalendar;
