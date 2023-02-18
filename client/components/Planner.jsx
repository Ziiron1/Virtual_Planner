import { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import api from "../config/axiosInstance";
import WelcomeMessage from './User'

const localizer = momentLocalizer(moment);

function MyCalendar() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("id_user");
    if (userId) {
      api
        .get(`http://localhost:4000/planner/user/${userId}`)
        .then((response) => {
          setEvents(response.data.planners);
        })
        .catch((error) => console.error(error));
    }
  }, []);

  function handleSelectEvent(event) {
    window.alert(event.title);
  }

  function handleSelectSlot(slotInfo) {
    const title = window.prompt("Coloque um titulo para o seu evento");
    if (title) {

      const userId = localStorage.getItem("id_user");
      if (userId) {
        api
          .post("/planner", {
            userID: userId,
            conteudo: "Conteudo",
            dataInicio: slotInfo.start,
            dataFim: slotInfo.end,
            rotulo: title,
          })
          .then((response) => {
            const planner = response.data;
            const newEvent = {
              id: planner.id,
              title: planner.rotulo,
              start: new Date(planner.dataInicio),
              end: new Date(planner.dataFim)
            };
            setEvents([...events, newEvent]);
            window.location.assign('/planner');
          })
          .catch((error) => console.error(error));
      }
    }
  }

  return (
    <div>
      <WelcomeMessage />
      {/* <Calendar
        localizer={localizer}
        events={events}
        startAccessor="dataInicio"
        endAccessor="dataFim"
        style={{ height: 500 }}
        selectable
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectSlot}
      /> */}
      <Calendar
        startAccessor="dataInicio"
        endAccessor="dataFim"
        views={["day", "agenda", "week", "month"]}
        selectable
        localizer={localizer}
        events={events}
        style={{ height: 500 }}
        onSelectEvent={(event) => alert(event.rotulo)}
        onSelectSlot={handleSelectSlot}
        step={10}
        showMultiDayTimes
        resizable={true}
        onEventDrop={console.log}
        onEventResize={console.log}
        onDragStart={console.log}
        onDropFromOutside={console.log}
        draggableAccessor={() => true}
        resizableAccessor={() => true}
      />
    </div>
  );
}

export default MyCalendar;
