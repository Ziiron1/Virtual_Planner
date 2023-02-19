import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { Alert, AlertTitle } from '@mui/material';
import { TextField, Button } from "@mui/material";
import styles from "./Login.module.css";

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
      const response = await axios.post("http://localhost:4000/login", {
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
    <div >
      <h1 className={styles.LoginTitle}>Login</h1>
      <div className={styles.container}>
        <form onSubmit={handleSubmit} className={styles.form}>
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
