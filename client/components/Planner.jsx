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
      const newEvent = {
        start: slotInfo.start,
        end: slotInfo.end,
        title,
      };

      axios
        .post("http://localhost:4000/planner", newEvent)
        .then((response) => {
          const userId = // id do usuário logado
            axios
              .get(`http://localhost:4000/users/${userId}`)
              .then((response) => {
                const user = response.data;
                user.events.push(response.data);
                axios
                  .put(`http://localhost:4000/users/${userId}`, user)
                  .then(() => {
                    setEvents([...events, response.data]);
                  });
              });
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
