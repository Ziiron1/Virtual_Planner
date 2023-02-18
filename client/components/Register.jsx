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
      const response = await axios.post("http://localhost:4000/register", newUser);
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
    <form onSubmit={handleSubmit}>
      {alert && (
        <Alert onClose={() => setAlert(null)} severity={alert.severity}>
          <AlertTitle>{alert.title}</AlertTitle> {alert.message}
        </Alert>
      )}
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="rua">Rua:</label>
        <input
          type="text"
          id="rua"
          value={rua}
          onChange={(event) => setRua(event.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="bairro">Bairro:</label>
        <input
          type="text"
          id="bairro"
          value={bairro}
          onChange={(event) => setBairro(event.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="cidade">Cidade:</label>
        <input
          type="text"
          id="cidade"
          value={cidade}
          onChange={(event) => setCidade(event.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="pais">País:</label>
        <input
          type="text"
          id="pais"
          value={pais}
          onChange={(event) => setPais(event.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="cep">CEP:</label>
        <input
          type="number"
          id="cep"
          value={cep}
          onChange={(event) => setCep(event.target.value)}
          required
        />
      </div>
      <button type="submit">Create User</button>
    </form>
  );
}

export default CreateUserForm;
