import { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, TextField } from "@mui/material";
import api from "../config/axiosInstance";

const localizer = momentLocalizer(moment);

function MyCalendar() {
  const [events, setEvents] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [editTitle, setEditTitle] = useState("");

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
    setSelectedEvent(event);
    setEditTitle(event.rotulo);
    setOpenDialog(true);
  }

  function handleDialogClose() {
    setOpenDialog(false);
  }

  function handleEditEvent() {
    const updatedEvent = { ...selectedEvent, rotulo: editTitle };

    api
      .patch(`/planner/${selectedEvent.id}`, updatedEvent)
      .then((response) => {
        const updatedEvents = events.map((event) => {
          if (event.id === selectedEvent.id) {
            return updatedEvent;
          }
          return event;
        });
        setEvents(updatedEvents);
        setSelectedEvent(updatedEvent);
        setOpenDialog(false);
      })
      .catch((error) => console.error(error));
  }

  function handleTitleChange(event) {
    setEditTitle(event.target.value);
  }

  function handleSelectSlot(slotInfo) {
    const title = window.prompt("Enter a title for your event");
    if (title) {
      const newEvent = {
        start: slotInfo.start,
        end: slotInfo.end,
        rotulo: title,
      };

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
            setEvents([...events, response.data]);
          })
          .catch((error) => console.error(error));
      }
    }
  }

  function handleDeleteEvent() {
    api
      .delete(`/planner/${selectedEvent._id}`)
      .then(() => {
        const updatedEvents = events.filter((event) => event.id !== selectedEvent.id);
        setEvents(updatedEvents);
        setSelectedEvent(null);
        setOpenDialog(false);
        console.log("Deletado com sucesso!!")
      })
      .catch((error) => console.error(error));
  }

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="dataInicio"
        endAccessor="dataFim"
        style={{ height: 500 }}
        selectable
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectSlot}
      />
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Edit Event</DialogTitle>
        <DialogContent>
          <DialogContentText>Edit the title of the event:</DialogContentText>
          <TextField label="Title" variant
            ="outlined" value={editTitle} onChange={handleTitleChange} />
        </DialogContent>
        <div style={{ display: "flex", justifyContent: "space-between", margin: "10px" }}>
          <Button variant="contained" color="secondary" onClick={handleDeleteEvent}>
            Delete
          </Button>
          <div>
            <Button variant="contained" onClick={handleDialogClose}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={handleEditEvent}>
              Save
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default MyCalendar;