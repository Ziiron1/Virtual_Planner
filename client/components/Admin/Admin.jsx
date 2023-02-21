import { useState, useEffect } from 'react';
import api from '../../config/axiosInstance';
import Modal from 'react-modal';
import '../styles/admin.css'

const CARD_BORDER_RADIUS = 'rounded-lg';
const CARD_SHADOW = 'shadow-md';
const BUTTON_RED = 'bg-red-500 hover:bg-red-700';
const BUTTON_TEXT_WHITE = 'text-white';
const BUTTON_FONT_BOLD = 'font-bold';
const BUTTON_PADDING = 'py px-1';

function TableItem({ _id, title, image, createdAt
    , onDelete, onUpdate }) {
    return (
        <tr key={_id}>
            <td className="border px-4 py-2">{_id}</td>
            <td className="border px-4 py-2">{title}</td>
            <td className="border px-4 py-2">{image}</td>
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

function Table({ items, handleDelete }) {
    return (
        <table className="w-full">
            <thead>
                <tr>
                    <th className="px-4 py-2">ID</th>
                    <th className="px-4 py-2">Titulo</th>
                    <th className="px-4 py-2">Imagem</th>
                    <th className="px-4 py-2">Criado em</th>
                    <th className="px-4 py-2">Ações</th>
                </tr>
            </thead>
            <tbody>
                {items.map((item, index) => (
                    <TableItem key={index} {...item} onDelete={() => handleDelete(item._id)} />
                ))}
            </tbody>
        </table>
    );
}

function Admin() {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState({ title: '', description: '', image: '' });
    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {
        async function fetchData() {
            const response = await api.get('http://localhost:4000/admin');
            setItems(response.data.result);
            console.log(response.data.result);
        }
        fetchData();
    }, []);

    const handleNewInputChange = (e) => {
        const { name, value } = e.target;
        setNewItem((prevNewItem) => ({ ...prevNewItem, [name]: value }));
    };

    const handleDelete = async (id) => {
        await api.delete(`http://localhost:4000/admin/${id}`);
        setItems((prevItems) => prevItems.filter((item) => item.id !== id));
        window.location.assign("/admin")
    };

    const handleCreate = async () => {
        await api.post('http://localhost:4000/admin', newItem);
        const response = await api.get('http://localhost:4000/admin');
        setItems(response.data.result);
        setModalIsOpen(false);
        setNewItem({ title: '', description: '', image: '' });
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-4xl mb-4">Painel Admin</h1>
            <div className={`${CARD_SHADOW} ${CARD_BORDER_RADIUS} p-4`}>
                <Table items={items} handleDelete={handleDelete} />
                <button className="fixed right-4 bottom-4 w-10 h-10 rounded-full bg-red-500 hover:bg-red-700 shadow-md text-white flex justify-center items-center"
                    onClick={() => setModalIsOpen(true)}>
                    +
                </button>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={() => setModalIsOpen(false)}
                    contentLabel="Add New Item"
                    className="bg-white rounded-md p-4 shadow-md animate-fade-in-down"
                    overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center animate-fade-in">
                    <h2 className="text-2xl font-bold mb-4">Adicione um novo item</h2>
                    <form>
                        <div className="mb-4">
                            <label className="block font-bold mb-2" htmlFor="title">
                                Titulo:
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={newItem.title}
                                onChange={handleNewInputChange}
                                className="block w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block font-bold mb-2" htmlFor="description">
                                Descrição:
                            </label>
                            <input
                                type="text"
                                id="description"
                                name="description"
                                value={newItem.description}
                                onChange={handleNewInputChange}
                                className="block w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block font-bold mb-2" htmlFor="image">
                                Imagem:
                            </label>
                            <input
                                type="text"
                                id="image"
                                name="image"
                                value={newItem.image}
                                onChange={handleNewInputChange}
                                className="block w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
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
