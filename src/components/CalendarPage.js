import { useState } from "react";
import Calendar from "../components/Calendar";

const CalendarPage = ({}) => {
  const [date, setDate] = useState(Date.now());
  return (
    <div>
      <Calendar value={date} onChange={setDate} />
    </div>
  );
};

export default CalendarPage;
