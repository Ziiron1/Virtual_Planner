import React, { useState, useEffect, useCallback } from 'react';
import api from '../../config/axiosInstance';
import TextField from '@mui/material/TextField';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Cookies from 'js-cookie';

function Planners() {
    const [planners, setPlanners] = useState([]);

    useEffect(() => {
        const Userid = Cookies.get('id_user');
        api.get(`/planner/user/${Userid}`)
            .then((response) => {
                setPlanners(response.data.planners);
                // console.log(response.data.planners)
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <div>
            {planners.map((planner) => (
                <Planner planner={planner} key={planner.id} />
            ))}
        </div>
    );
}

function ComentarioItem({ value, onChange }) {
    return (
        <div>
            <textarea value={value} onChange={onChange} />
        </div>
    );
}

function Planner({ planner }) {
    const [title, setTitle] = useState(planner.title);
    const [content, setContent] = useState(planner.conteudo);
    const [comentarios, setComentarios] = useState(planner.comentarios);
    const [start, setStart] = useState(new Date(planner.start));
    const [end, setEnd] = useState(new Date(planner.end));

    const handleTitleChange = useCallback((event) => {
        setTitle(event.target.value);
    }, []);

    const handleContentChange = useCallback((event) => {
        setContent(event.target.value);
    }, []);

    const handleComentarioChange = useCallback((index, event) => {
        const newComentarios = [...comentarios];
        newComentarios[index] = event.target.value;
        setComentarios(newComentarios);
    }, [comentarios]);

    const handleStartChange = useCallback((event) => {
        setStart(new Date(event));
    }, []);

    const handleEndChange = useCallback((event) => {
        setEnd(new Date(event));
    }, []);

    const handleSave = useCallback(async () => {
        const response = await api.patch(`https://plannervirtual.onrender.com/planner/${planner.id}`, {
            title,
            content,
            comentarios,
            end,
            start,
        });

        const data = await response;
        console.log(data.data);
    }, [title, content, comentarios, end, start]);

    return (
        <div>
            <h2>{planner.title}</h2> {/* Titulo */}
            <p>{planner.content}</p> {/* Conteudo */}
            <button onClick={() => handleSave()}>Salvar</button> {/* Botao para cada um, salvar */}

            <input type="text" value={title} onChange={handleTitleChange} /> {/* Input do titulo */}

            <textarea value={content} onChange={handleContentChange} /> {/* Text Area para o comentario  */}
            {comentarios.map((comentario, index) => (
                <ComentarioItem
                    key={index}
                    value={comentario}
                    onChange={(event) => handleComentarioChange(index, event)}
                />
            ))}

            <LocalizationProvider dateAdapter={AdapterDayjs}> {/* Horario mais digital para visual */}
                <div>
                    <TextField
                        label="Title"
                        value={title}
                        onChange={handleTitleChange}
                        sx={{ marginBottom: "1rem" }}
                    />
                    <TimePicker
                        label="Start"
                        value={start}
                        onChange={handleStartChange}
                        renderInput={(params) => <TextField {...params} />}
                        sx={{ marginBottom: "1rem" }}
                    />
                    <TimePicker
                        label="End"
                        value={end}
                        onChange={handleEndChange}
                        renderInput={(params) => <TextField {...params} />}
                        sx={{ marginBottom: "1rem" }}
                    />
                </div>
            </LocalizationProvider>
        </div>
    );
}


export default Planners;
