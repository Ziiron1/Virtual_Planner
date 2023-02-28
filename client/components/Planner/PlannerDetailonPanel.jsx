import React, { useState, useEffect, useCallback } from 'react';
import api from '../../config/axiosInstance';
import Cookies from 'js-cookie';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaExclamationCircle } from 'react-icons/fa';
import { FaCheck } from 'react-icons/fa';

function Planners() {
    const [planners, setPlanners] = useState([]);

    useEffect(() => {
        const Userid = Cookies.get('id_user');
        api.get(`/planner/user/${Userid}`)
            .then((response) => {
                setPlanners(response.data.planners);
                console.log(response.data.planners);
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
    const [conteudo, setConteudo] = useState(planner.conteudo);
    const [comentarios, setComentarios] = useState(planner.comentarios);
    const [start, setStart] = useState(new Date(planner.start));
    const [end, setEnd] = useState(new Date(planner.end));
    const [date, setDate] = useState(new Date());

    const handleTitleChange = useCallback((event) => {
        setTitle(event.target.value);
    }, []);

    const handleContentChange = useCallback((event) => {
        setConteudo(event.target.value);
    }, []);

    const handleComentarioChange = useCallback((index, event) => {
        const newComentarios = [...comentarios];
        newComentarios[index] = event.target.value;
        setComentarios(newComentarios);
    }, [comentarios]);

    const handleStartChange = (value) => {
        const newStart = new Date(`2023-03-03T${value}:00Z`);
        setStart(newStart);
    };

    const handleEndChange = (value) => {
        const newEnd = new Date(`2023-03-03T${value}:00Z`);
        setEnd(newEnd);
    };

    const handleSave = useCallback(async () => {
        try {
            const response = await api.patch(`/planner/${planner.id}`, {
                title,
                conteudo,
                comentarios,
                end,
                start,
            });

            toast.success('Planner Atualizado!', {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                style: {
                    fontFamily: 'Roboto',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    backgroundColor: '#0BA379',
                    color: '#F5F5F5',
                    borderRadius: '8px',
                    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)',
                    padding: '16px',
                    border: "none",

                },
                toastClassName: 'custom-toast',
                bodyClassName: 'custom-toast-body',
                progressClassName: 'custom-toast-progress',
                closeButton: false,
                icon: <FaCheck />
            })
        } catch (error) {
            console.log(error);
            toast.error('Não foi possível atualizar os dados!', {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                style: {
                    backgroundColor: '#B71C19',
                    color: '#f5f5f5ff',
                    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)',
                    fontFamily: 'Roboto',
                    fontSize: '16px',
                },
                toastClassName: 'custom-toast',
                bodyClassName: 'custom-toast-body',
                progressClassName: 'custom-toast-progress',
                closeButton: false,
                icon: <FaExclamationCircle />,
            })
        }
    }, [title, conteudo, comentarios, end, start]);

    return (
        <div className="border-2 rounded-lg border-gray-400 p-4 my-4">
            <h2 className="text-lg font-bold mb-2">{planner.title}</h2>


            <div className="space-y-2">
                <label className="block font-bold mb-2" htmlFor='title'>Título:</label>
                <input
                    type="text"
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={title}
                    id="title"
                    onChange={handleTitleChange}
                />
                <div className="border border-gray-300 rounded mb-2 p-2">
                    <label htmlFor="content" className="block font-bold mb-2">Conteúdo:</label>
                    <textarea
                        id="content"
                        className="w-full text-gray-700"
                        value={conteudo}
                        onChange={handleContentChange}
                    />
                </div>

                <div className="border border-gray-300 rounded mb-2 p-2">
                    <label htmlFor="comentarios" className="block font-bold mb-2">Comentários:</label>
                    {comentarios.map((comentario, index) => (
                        <ComentarioItem
                            key={index}
                            value={comentario}
                            onChange={(event) => handleComentarioChange(index, event)}
                        />
                    ))}
                </div>
                <label className="block font-bold mb-2">Início:</label>
                <input
                    type="time"
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={start && start.toISOString ? start.toISOString().slice(11, 16) : ''}
                    onChange={(event) => handleStartChange(event.target.value)}
                />
                <label className="block font-bold mb-2">Fim:</label>
                <input
                    type="time"
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={end.toISOString().slice(11, 16)}
                    onChange={(event) => handleEndChange(event.target.value)}
                />
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={handleSave}
                >
                    Salvar
                </button>
            </div>

        </div>
    );
}

export default Planners;
