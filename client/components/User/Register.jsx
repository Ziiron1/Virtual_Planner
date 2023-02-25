import React, { useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { Alert, AlertTitle } from '@mui/material';

function CreateUserForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [rua, setRua] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [pais, setPais] = useState("");
  const [cep, setCep] = useState("");
  const navigate = useNavigate();
  const [alert, setAlert] = useState(null);


  const handleSubmit = async (event) => {
    event.preventDefault();
    const newUser = {
      name,
      email,
      password,
      isAdmin,
      rua,
      bairro,
      cidade,
      pais,
      cep,
      events: [],
      planners: [],
    };

    try {
      const response = await axios.post("https://plannervirtual.onrender.com/register", newUser);
      console.log(response.data);

      setAlert({
        title: "Sucesso",
        message: "Cadastrado com sucesso!",
        severity: "success",
      });

      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (err) {
      console.error(err);
      setAlert({
        title: "Error",
        message: "Erro ao Cadastrar-se! Email já existente!",
        severity: "error",
      });
    }


    // Reset the form
    setName("");
    setEmail("");
    setPassword("");
    setIsAdmin(false);
    setRua("");
    setBairro("");
    setCidade("");
    setPais("");
    setCep("");
  };

  return (
    <div className="ml-96 mt-7">

      <h1 className="font-bold from-stone-600 text-4xl mx-auto">Cadastre-se</h1>
      <form onSubmit={handleSubmit} className="w-full p-4 mx-auto">
        {alert && (
          <Alert onClose={() => setAlert(null)} severity={alert.severity}>
            <AlertTitle>{alert.title}</AlertTitle> {alert.message}
          </Alert>
        )}
        <div className=" p-4">
          <label htmlFor="name" className="block mb-2">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="w-2/4 py-2 px-4 rounded border border-gray-300 mb-4"
            required
          />
          <label htmlFor="email" className="block mb-2">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-2/4 py-2 px-4 rounded border border-gray-300 mb-4"
            required
          />
          <label htmlFor="password" className="block mb-2">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-2/4 py-2 px-4 rounded border border-gray-300 mb-4"
            required
          />
          <label htmlFor="rua" className="block mb-2">Rua:</label>
          <input
            type="text"
            id="rua"
            value={rua}
            onChange={(event) => setRua(event.target.value)}
            className="w-2/4 py-2 px-4 rounded border border-gray-300 mb-4"
            required
          />
          <label htmlFor="bairro" className="block mb-2">Bairro:</label>
          <input
            type="text"
            id="bairro"
            value={bairro}
            onChange={(event) => setBairro(event.target.value)}
            className="w-2/4 py-2 px-4 rounded border border-gray-300 mb-4"
            required
          />
          <label htmlFor="cidade" className="block mb-2">Cidade:</label>
          <input
            type="text"
            id="cidade"
            value={cidade}
            onChange={(event) => setCidade(event.target.value)}
            className="w-2/4 py-2 px-4 rounded border border-gray-300 mb-4"
            required
          />
          <label htmlFor="pais" className="block mb-2">País:</label>
          <input
            type="text"
            id="pais"
            value={pais}
            onChange={(event) => setPais(event.target.value)}
            className="w-2/4 py-2 px-4 rounded border border-gray-300 mb-4"
            required
          />
          <label htmlFor="cep" className="block mb-2">CEP:</label>
          <input
            type="text"
            id="cep"
            value={cep}
            onChange={(event) => setCep(event.target.value)}
            className="w-2/4 py-2 px-4 rounded border border-gray-300 mb-4"
            required
          />
          <br />
          <small className="mb-8">Apenas os números</small>
          <br />
          <br />
        </div>

        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Criar Usuário
        </button>
        <small style={{ marginTop: '4px', marginBottom: '4px' }}> <br /> <br />Já tem uma conta? Faça o <a href="/login" className="bg-slate-100 p-1 border-b-2 border-x-pink-700 rounded-md">Login</a></small>
        <br />
        <br />

      </form>
    </div>

  );
}

export default CreateUserForm;
