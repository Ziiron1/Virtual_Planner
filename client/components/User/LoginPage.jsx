import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { Alert, AlertTitle } from '@mui/material';
import { TextField, Button } from "@mui/material";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [alert, setAlert] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      try {
        jwt_decode(token);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Token inválido:", error.message);
      }
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("https://plannervirtual.onrender.com/login", {
        email: email,
        password: password,
      });

      const id_user = response.data.id;
      const token = response.data.token;
      const name = response.data.name;
      const isAdmin = response.data.isAdmin;

      Cookies.set("token", token);
      Cookies.set("id_user", id_user);
      Cookies.set("Username", name);
      Cookies.set("is_Admin", isAdmin);
      setIsAuthenticated(true);

      setAlert({
        title: "Successo",
        message: "Login realizado com sucesso",
        severity: "success",
      });

    } catch (error) {
      console.error(error);

      setAlert({
        title: "Error",
        message: "Email ou senha inválido",
        severity: "error",
      });
      setError(true);
      setEmail("");
      setPassword("");

      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  };

  if (isAuthenticated === true) {

    setTimeout(() => {
      window.location.assign('/calendar')
    }, 1500);

  }

  return (
    <div>
      <h1 className="text-center text-3xl font-bold">Login</h1>
      <div className="flex flex-col items-center max-w-400px mx-auto p-5 ">
        <form onSubmit={handleSubmit} className="flex flex-col items-center w-full px-0 pb-7 pt-5 border-2 border-red-400 max-w-sm">
          {alert && (
            <Alert onClose={() => setAlert(null)} severity={alert.severity}>
              <AlertTitle>{alert.title}</AlertTitle> {alert.message}
            </Alert>
          )}
          <TextField
            id="email"
            label="Email"
            type="email"
            variant="standard"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            margin="normal"
            className={` mb-20 ${error ? 'border-red-500' : ''}`}
            error={error} // Define a existência de erro
            helperText={error/*  && 'Email ou senha incorretos' */} // Define a mensagem de erro
            InputProps={{ style: { borderBottomColor: error ? 'red' : 'initial' } }} // Define a cor da borda de acordo com o erro
          />
          <div>
            <TextField
              id="password"
              label="Senha"
              type="password"
              variant="standard"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              margin="normal"
              className={` mb-20 ${error ? 'border-red-500' : ''}`}
              error={error} // Define a existência de erro
              helperText={error/*  && 'Email ou senha incorretos' */} // Define a mensagem de erro
              InputProps={{ style: { borderBottomColor: error ? 'red' : 'initial' } }} // Define a cor da borda de acordo com o erro
            />
          </div>
          <Button variant="contained" color="primary" type="submit">
            Entrar
          </Button>
          <br />
          <small style={{ marginTop: '4px', marginBottom: '4px' }}>Não tem uma conta? Faça o cadastro</small>
          <br />
          <br />
          <Button
            variant="outlined"
            color="primary"
            type="submit"
            style={{ background: 'transparent' }}
          >
            <a href="/register" style={{ textDecoration: 'none', color: 'inherit' }}>Cadastre-se</a>
          </Button>

        </form>
      </div>
    </div>
  );
}

export default LoginPage;
