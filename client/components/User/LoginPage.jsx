import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaExclamationCircle } from 'react-icons/fa';
import { FaCheck } from 'react-icons/fa';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);

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
            toast.success('Login efetuado com sucesso!', {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                style: {
                    fontFamily: 'Roboto',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    backgroundColor: '#0BB36A',
                    color: '#FFF',
                    borderRadius: '8px',
                    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)',
                    padding: '16px',
                    border: "none",

                },
                toastClassName: 'custom-toast',
                bodyClassName: 'custom-toast-body',
                progressClassName: 'custom-toast-progress',
                closeButton: false,
                icon: <FaCheck />,
            })



        } catch (error) {
            console.error(error);
            toast.error('Ocorreu um erro ao fazer login', {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                style: {
                    backgroundColor: '#FFCDD2',
                    color: '#B71C1C',
                    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)',
                    fontFamily: 'Roboto',
                    fontSize: '16px',
                },
                toastClassName: 'custom-toast',
                bodyClassName: 'custom-toast-body',
                progressClassName: 'custom-toast-progress',
                closeButton: false,
                icon: <FaExclamationCircle />,
            });

        }
    };

    if (isAuthenticated === true) {

        setTimeout(() => {
            window.location.assign('/calendar')
        }, 2000);

    }

    return (
        <div className={styles.login_container}>
            <div className={styles.main}>
                <div id="illustration" className={styles.illustration}></div>
                <div className={styles.form_container}>

                    <div className={styles.form_header}>
                        <h3 className={styles.h3}>Entre nessa aventura</h3>
                        <p className={styles.p}>
                            Não tem uma conta? <a href="/register" className="border-b-2 border-transparent hover:border-gray-900 font-bold">Cadastre-se</a>
                        </p>
                    </div>
                    <form id="login-form" onSubmit={handleSubmit} className={styles.form}>
                        <label htmlFor="email-input">Email</label>
                        <input
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            id="email-input"
                            type="email"
                            className={styles.input}
                            placeholder="Email"
                        />

                        <label htmlFor="password-input">Senha</label>
                        <input
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            id="password-input"
                            type="password"
                            className={styles.input}
                            placeholder="Senha"
                        />
                        <button type="submit" form="login-form" value="Submit" className={styles.btn}>
                            Entrar
                        </button>
                    </form>
                    <div className={styles.form_buttons}>
                        <button className="border border-solid border-gray-400 hover:border-gray-700 bg-transparent bg-opacity-100 hover:bg-violet-400 rounded px-3 py-2">
                            <i className="fa-brands fa-google mr-1"></i>
                            <span>Entrar com Google</span>
                        </button>
                        <button className="border border-solid border-gray-400 hover:border-gray-700 bg-transparent bg-opacity-100 hover:bg-violet-400 rounded px-3 py-2">
                            <i className="fa-brands fa-facebook"></i>
                        </button>
                        <button className="border border-solid border-gray-400 hover:border-gray-700 bg-transparent bg-opacity-100 hover:bg-violet-400 rounded px-3 py-2">
                            <i className="fa-brands fa-apple"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
