import { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, Modal } from "@mui/material";
import api from "../config/axiosInstance";
import Cookies from "js-cookie";
import WelcomeUser from './User/User';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";

const DragAndDropCalendar = withDragAndDrop(Calendar);

const localizer = momentLocalizer(moment);

function MyCalendar() {
  const [events, setEvents] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [open, setOpen] = useState(false);

  function AddEventModal(props) {
    const { open, onClose, onSubmit } = props;
    const [title, setTitle] = useState("");
    const [date, setDate] = useState(new Date());

    const handleTitleChange = (event) => {
      setTitle(event.target.value);
    };

    const handleDateChange = (date) => {
      setDate(date);
    };

    const handleSubmit = () => {
      onSubmit({
        start: date,
        end: date,
        title: title,
      });
      onClose();
    };

    return (
      <Modal open={open} onClose={onClose}>
        <div style={{ backgroundColor: "white", padding: "1rem" }}>
          <TextField
            label="Title"
            value={title}
            onChange={handleTitleChange}
            sx={{ marginBottom: "1rem" }}
          />
          <DateTimePicker
            label="Date and Time"
            value={date}
            onChange={handleDateChange}
            sx={{ marginBottom: "1rem" }}
          />
          <Button variant="contained" onClick={handleSubmit}>
            Add Event
          </Button>
        </div>
      </Modal>
    );
  }

  useEffect(() => {
    const userId = Cookies.get("id_user");
    if (userId) {
      api
        .get(`https://plannervirtual.onrender.com/planner/user/${userId}`)
        .then((response) => {
          setEvents(response.data.planners);
        })
        .catch((error) => console.error(error));
    }
  }, []);

  function handleSelectEvent(event) {
    setSelectedEvent(event);
    setEditTitle(event.title);
    setOpenDialog(true);
  }

  function handleDialogClose() {
    setOpenDialog(false);
  }

  function handleEditEvent() {
    const updatedEvent = { ...selectedEvent, title: editTitle };

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
        title: title,
      };

      const userId = Cookies.get("id_user");
      if (userId) {
        api
          .post("/planner", {
            userID: userId,
            conteudo: "Conteudo",
            start: slotInfo.start,
            end: slotInfo.end,
            title: title,
          })
          .then((response) => {
            setEvents([...events, response.data]);
            setTimeout(() => {
              window.location.assign('/calendar');
            }, 100)
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

  const [modalOpen, setModalOpen] = useState(false);
  function handleAddEvent(eventData) {
    const { title, start, end } = eventData;
    const userId = Cookies.get("id_user");
    if (userId) {
      api.post("/planner", {
        userID: userId,
        conteudo: "Conteudo",
        start: start,
        end: end,
        title: title,
      })
        .then((response) => {
          setEvents([...events, response.data]);
          setModalOpen(false);
        })
        .catch((error) => console.error(error));
    }
  }

  function handleEventDrop({ event, start, end, allDay }) {
    const updatedEvent = { ...event, start, end, allDay };
    const updatedEvents = events.map((e) => (e.id === updatedEvent.id ? updatedEvent : e));
    setEvents(updatedEvents);

    api
      .patch(`/planner/${updatedEvent.id}`, updatedEvent)
      .then((response) => {
        //...
      })
      .catch((error) => console.error(error));
  }

  function handleEventResize({ event, start, end }) {
    const updatedEvent = { ...event, start, end };
    const updatedEvents = events.map((e) => (e.id === updatedEvent.id ? updatedEvent : e));
    setEvents(updatedEvents);

    api
      .patch(`/planner/${updatedEvent.id}`, updatedEvent)
      .then((response) => {
        //...
      })
      .catch((error) => console.error(error));
  }

  function handleEventResize({ event, start, end }) {
    const updatedEvent = { ...event, start, end };

    api
      .patch(`/planner/${updatedEvent.id}`, updatedEvent)
      .then((response) => {
        const updatedEvents = events.map((e) =>
          e.id === updatedEvent.id ? updatedEvent : e
        );
        setEvents(updatedEvents);
      })
      .catch((error) => console.error(error));
  }

  return (
    <div>
      <WelcomeUser />
      <DragAndDropCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        selectable
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectSlot}
        onEventDrop={handleEventDrop}
        resizable
        onEventResize={handleEventResize}
      />
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Edit Event</DialogTitle>
        <DialogContent>
          <DialogContentText>Preencha as informações do novo evento:</DialogContentText>
          <TextField label="Titulo" variant="outlined" value={editTitle} onChange={handleTitleChange} fullWidth />
          <TextField label="Data de início" type="datetime-local" InputLabelProps={{ shrink: true }} fullWidth />
          <TextField label="Data de término" type="datetime-local" InputLabelProps={{ shrink: true }} fullWidth />
        </DialogContent>
        <DialogActions>
          <div style={{ display: "flex", justifyContent: "space-between", margin: "10px" }}>
            <Button variant="contained" color="secondary" onClick={handleDeleteEvent}> {/* Realmente deleta. */}
              Delete
            </Button>
            <div>
              <Button variant="contained" onClick={handleDialogClose}> {/* Fecha apenas */}
                Cancel
              </Button>
              <Button variant="contained" color="primary" onClick={handleEditEvent}>
                Save
              </Button>
              <AddEventModal open={open} onClose={handleDialogClose} onSubmit={handleAddEvent} />
            </div>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default MyCalendar;