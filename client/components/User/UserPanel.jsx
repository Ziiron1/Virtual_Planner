import { useState, useEffect } from 'react';
// import { Grid, Paper, Typography } from '@mui/material';
// import { makeStyles } from "@material-ui/core/styles";
import Cookie from 'js-cookie';
import Planner from '../Planner/PlannerDetailonPanel'
import api from '../../config/axiosInstance'
// import IconButton from '@material-ui/core/IconButton';
// import EditIcon from '@mui/icons-material/Edit';

/*  /planner/user/:id */
function UserEditPage() {
    const [editMode, setEditMode] = useState(false);
    const [user, setUser] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rua, setRua] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [pais, setPais] = useState('');
    const [cep, setCep] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const Userid = Cookie.get('id_user');
        api.get(`/planner/user/${Userid}`)
            .then((response) => {
                setUser(response.data.planners);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        const Userid = Cookie.get('id_user');
        api.get(`/users/${Userid}`)
            .then((response) => {
                const { name, email, password, endereco } = response.data.user;
                setName(name);
                setEmail(email);
                setPassword(password);
                setRua(endereco.rua || '');
                setBairro(endereco.bairro || '');
                setCidade(endereco.cidade || '');
                setPais(endereco.pais || '');
                setCep(endereco.cep || '');
                setLoading(false); // atualiza o estado para indicar que as informações foram carregadas
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleEdit = () => {
        setEditMode(!editMode);
        const editableInputs = document.querySelectorAll('.editable');
        if (editableInputs) {
            if (editMode) {
                editableInputs.forEach(input => {
                    input.classList.remove('bg-neutral-100');
                });
            } else {
                editableInputs.forEach(input => {
                    input.classList.add('bg-neutral-100');
                });
            }
        }
    }

    const handleSave = () => {
        const Userid = Cookie.get('id_user');
        api.patch(`/users/${Userid}`, {
            name,
            email,
            password,
            endereco: {
                rua,
                bairro,
                cidade,
                pais,
                cep,
            },
        })
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    };


    return (
        <div className="grid grid-cols-2">
            <div className="col-span-2 flex">
                {loading ? ( // condição para renderizar o formulário apenas quando as informações do usuário forem carregadas
                    <h4 className="text-lg font-bold">Carregando...</h4>
                ) : (
                    <form className="w-full">
                        <button
                            type="button"
                            onClick={handleEdit}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded text-sm px-3 py-2"
                        >
                            Editar informações do usuário
                        </button>

                        <div className="flex flex-col p-4 w-full">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 py-4">Nome</label>
                                <input type="text" name="name" id="name" defaultValue={name} disabled={!editMode} onChange={(e) => setName(e.target.value)} className="p-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-neutral-400 editable" />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 py-4">E-mail</label>
                                <input type="email" name="email" id="email" defaultValue={email} disabled={!editMode} onChange={(e) => setEmail(e.target.value)} className="p-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-neutral-400 editable" />
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 py-4">Senha</label>
                                <input type="password" name="password" id="password" value={password} disabled={!editMode} onChange={(e) => setPassword(e.target.value)} className="p-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-neutral-400 editable" />
                            </div>
                            <div>
                                <label htmlFor="rua" className="block text-sm font-medium text-gray-700 py-4">Rua</label>
                                <input type="text" name="rua" id="rua" value={rua} disabled={!editMode} onChange={(e) => setRua(e.target.value)} className="p-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-neutral-400 editable" />
                            </div>
                            <div>
                                <label htmlFor="bairro" className="block text-sm font-medium text-gray-700 py-4">Bairro</label>
                                <input type="text" name="bairro" id="bairro" value={bairro} disabled={!editMode} onChange={(e) => setBairro(e.target.value)} className="p-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-neutral-400 editable" />
                            </div>
                            <div>
                                <label htmlFor="cidade" className="block text-sm font-medium text-gray-700 py-4">Cidade</label>
                                <input type="text" name="cidade" id="cidade" value={cidade} disabled={!editMode} onChange={(e) => setCidade(e.target.value)} className="p-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-neutral-400 editable" />
                            </div>
                            <div>
                                <label htmlFor="pais" className="block text-sm font-medium text-gray-700 py-4">Pais</label>
                                <input type="text" name="pais" id="pais" value={pais} disabled={!editMode} onChange={(e) => setPais(e.target.value)} className="p-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-neutral-400 editable" />
                            </div>
                            <div>
                                <label htmlFor="cep" className="block text-sm font-medium text-gray-700 py-4">Cep</label>
                                <input type="text" name="cep" id="cep" value={cep} disabled={!editMode} onChange={(e) => setCep(e.target.value)} className="p-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-neutral-400 editable" />
                            </div>
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                                onClick={handleSave}
                            >
                                Salvar
                            </button>
                        </div>
                    </form >
                )}


                <div className="col-span-2 w-full">
                    <h4 className="text-lg font-bold">
                        Meus Planners
                    </h4>
                    {user && user.map((planner) => (
                        <Planner key={planner.id} planner={planner} />
                    ))}
                </div>
            </div>
        </div >
    );
}

export default UserEditPage;
