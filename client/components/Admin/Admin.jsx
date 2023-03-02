import React, { useState, useEffect } from 'react';
import api from '../../config/axiosInstance';
import Modal from 'react-modal';
import '../styles/admin.css'

const CARD_BORDER_RADIUS = 'rounded-lg';
const CARD_SHADOW = 'shadow-md';
const BUTTON_RED = 'bg-red-500 hover:bg-red-700';
const BUTTON_TEXT_WHITE = 'text-white';
const BUTTON_FONT_BOLD = 'font-bold';
const BUTTON_PADDING = 'py px-1';

function TableItem({ IDAdmin, title, image, description, createdAt, onDelete, onUpdate }) {
    return (
        <tr key={IDAdmin}>
            <td className="border px-4 py-2">{IDAdmin}</td>
            <td className="border px-4 py-2">{title}</td>
            <td className="border px-4 py-2 max-w-0 truncate">{image}</td>
            <td className="border px-4 py-2">{description}</td>
            <td className="border px-4 py-2">{createdAt}</td>
            <td className="border px-2 py-2">

                <button
                    className={`
                    ${BUTTON_RED} 
                    ${BUTTON_TEXT_WHITE} 
                    ${BUTTON_FONT_BOLD}
                     ${BUTTON_PADDING}
                     ${CARD_BORDER_RADIUS}
                     `}
                    onClick={onDelete}
                >
                    Delete
                </button>

                <button
                    className={`
                     ${BUTTON_TEXT_WHITE}
                      ${BUTTON_FONT_BOLD}
                       ${BUTTON_PADDING}
                        ${CARD_BORDER_RADIUS}
                         ml-4 bg-rose-600
                          hover:bg-rose-800
                          `}
                    onClick={onUpdate}
                >
                    Update
                </button>

            </td>
        </tr>
    );
}

function Table({ items, handleDelete, handleUpdate }) {
    return (
        <table className="w-full">
            <thead>
                <tr>
                    <th className="px-4 py-2">ID</th>
                    <th className="px-4 py-2">Titulo</th>
                    <th className="px-4 py-2">Imagem</th>
                    <th className="px-4 py-2">Descrição</th>
                    <th className="px-4 py-2">Criado em</th>
                    <th className="px-4 py-2">Ações</th>
                </tr>
            </thead>
            <tbody>
                {items.map((item) => (
                    <TableItem
                        key={item.IDAdmin}
                        {...item}
                        onDelete={() => handleDelete(item.IDAdmin)}
                        onUpdate={() => handleUpdate(item.IDAdmin)} />
                ))}
            </tbody>
        </table>
    );
}

function Admin() {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState({ title: '', description: '', image: '' });
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');
    const [showInputs, setShowInputs] = useState(false);

    useEffect(() => {
        async function fetchData() {
            const response = await api.get('/admin');
            setItems(response.data.result);
            console.log(response.data.result)
        }
        fetchData();
    }, []);

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleImageChange = (event) => {
        setImage(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleShowInputsClick = () => {
        setShowInputs(true);
    };

    const handleHideInputsClick = () => {
        setShowInputs(false);
    };

    const handleNewInputChange = (e) => {
        const { name, value } = e.target;
        setNewItem((prevNewItem) => ({ ...prevNewItem, [name]: value }));
    };

    const handleDelete = async (id) => {
        await api.delete(`/admin/${id}`);
        setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    };

    const handleUpdate = (id) => {
        api.patch(`/admin/${id}`, {
            title,
            image,
            description
        })
            .then(response => {
                console.log(response.data);
                
            })
            .catch(error => {
                console.log(error);
            })
    };

    const handleCreate = async () => {
        await api.post('/admin', newItem);
        const response = await api.get('/admin');
        setItems(response.data.result);
        setModalIsOpen(false);
        setNewItem({ title: '', description: '', image: '' });
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-4xl mb-4">Painel Admin</h1>
            <div className={`${CARD_SHADOW} ${CARD_BORDER_RADIUS} p-4`}>
                <Table items={items} handleDelete={handleDelete} handleUpdate={handleUpdate} />
                <button className="fixed right-4 bottom-4 w-10 h-10 rounded-full bg-red-500 hover:bg-red-700 shadow-md text-white flex justify-center items-center"
                    onClick={() => setModalIsOpen(true)}>
                    +
                </button>
                <div className="max-w-lg mx-auto mt-4">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
                        onClick={showInputs ? handleHideInputsClick : handleShowInputsClick}
                    >
                        {showInputs ? 'Esconder' : 'Alterar'}
                    </button>

                    <div
                        className={`mt-4 transition-opacity duration-300 ${showInputs ? 'opacity-100' : 'opacity-0'}`}
                        style={{ display: showInputs ? 'block' : 'none' }}
                    >
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="title-input">
                            Título
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="title-input"
                            type="text"
                            value={title}
                            onChange={handleTitleChange}
                        />

                        <label className="block text-gray-700 font-bold mt-4 mb-2" htmlFor="image-input">
                            Imagem
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="image-input"
                            type="text"
                            value={image}
                            onChange={handleImageChange}
                        />

                        <label className="block text-gray-700 font-bold mt-4 mb-2" htmlFor="description-input">
                            Descrição
                        </label>
                        <textarea
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="description-input"
                            value={description}
                            onChange={handleDescriptionChange}
                        ></textarea>
                    </div>
                </div>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={() => setModalIsOpen(false)}
                    contentLabel="Adicionar novo item"
                    className="bg-white rounded-md p-4 shadow-md animate-fade-in-down"
                    overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center animate-fade-in">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">Adicione um novo item</h2>
                    <form>
                        <div className="mb-4">
                            <label className="block font-bold mb-2 text-gray-700" htmlFor="title">
                                Titulo:
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={newItem.title}
                                onChange={handleNewInputChange}
                                className="block w-full p-2 border bg-gray-200 rounded-md focus:outline-none text-slate-600 focus:ring focus:border-blue-300"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block font-bold mb-2 text-gray-700" htmlFor="description">
                                Descrição:
                            </label>
                            <input
                                type="text"
                                id="description"
                                name="description"
                                value={newItem.description}
                                onChange={handleNewInputChange}
                                className="block w-full p-2 border rounded-md bg-gray-200 focus:outline-none text-slate-600 focus:ring focus:border-blue-300"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block font-bold mb-2 text-gray-700" htmlFor="image">
                                Imagem:
                            </label>
                            <input
                                type="text"
                                id="image"
                                name="image"
                                value={newItem.image}
                                onChange={handleNewInputChange}
                                className="block w-full p-2 border rounded-md bg-gray-200 focus:outline-none text-slate-600 focus:ring focus:border-blue-300"
                            />
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={handleCreate}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mr-2 transform transition duration-500 ease-in-out hover:scale-110"
                            >
                                Criar
                            </button>
                            <button
                                type="button"
                                onClick={() => setModalIsOpen(false)}
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md"
                            >
                                Cancelar
                            </button>
                        </div>
                    </form>
                </Modal>
            </div>
        </div >
    );
}

export default Admin;
