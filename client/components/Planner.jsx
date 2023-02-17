import { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from "axios";

const localizer = momentLocalizer(moment);

function MyCalendar() {
  const [events, setEvents] = useState([]);

  function handleSelectEvent(event) {
    window.alert(event.title);
  }

  function handleSelectSlot(slotInfo) {
    const title = window.prompt("Enter a title for your event");
    if (title) {
      axios
        .get("http://localhost:4000/planner")
        .then((response) => {
          console.log(response.data);
          setEvents([
            ...events,
            {
              start: slotInfo.start,
              end: slotInfo.end,
              title,
            },
          ]);
        })
        .catch((error) => console.error(error));
    }
  }

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        selectable
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectSlot}
      />
    </div>
  );
}

export default MyCalendar;
