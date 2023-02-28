import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import styles from '../User/styles.module.css'
import dark from '../User/assets/dark.jpg'
import light from '../User/assets/light.jpg'

const Header = () => {
    const [theme, setTheme] = useState(
        window.localStorage.getItem("theme") || "dark"
    );

    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://kit.fontawesome.com/7f335cf7b9.js";
        script.crossOrigin = "anonymous";
        script.async = true;
        document.body.appendChild(script);
    }, []);

    useEffect(() => {
        try {
            const illustration = document.getElementById("illustration");
            illustration.style.backgroundImage = `url(${theme === 'dark' ? dark : light})`;
            document.documentElement.setAttribute("data-theme", theme);
            window.localStorage.setItem("theme", theme);
        } catch (error) {
            console.log(error.message);
        }
    }, [theme]);

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        window.localStorage.setItem("theme", theme);
    }, [theme]);

    const handleThemeChange = () => {
        setTheme(prevTheme => prevTheme === "dark" ? "light" : "dark");
    };

    function handleLogout() {
        Cookies.remove("token");
        Cookies.remove("id_user");
        Cookies.remove("Username");
        Cookies.remove("is_Admin");

        setTimeout(() => {
            window.location.assign("/login");
        }, 200);
    }

    const isAdmin = Cookies.get("is_Admin");

    const isLoggedIn =
        Cookies.get("token") &&
        Cookies.get("id_user") &&
        Cookies.get("Username") &&
        Cookies.get("is_Admin");

    return (
        <header className="flex justify-between items-center py-4 px-6">
            <div className="flex items-center">
                <Link to="/">
                    <img alt="Logo" className="h-8 mr-4" src="" width="100px" />
                </Link>
                <div className="flex items-center">
                    <Link to="/calendar" className="ml-4 hover:text-gray-900">
                        <h2 className="mr-4 hover:text-gray-900 border-b-2 border-transparent hover:border-gray-900 font-bold ">Planner App</h2>
                    </Link>
                    {isAdmin === "true" ? (
                        <Link to="/admin" className="ml-4 hover:text-gray-900">
                            <h2 className="mr-4 hover:text-gray-900 border-b-2 border-transparent hover:border-gray-900 font-bold transition duration-300 ease-in-out">Admin</h2>
                        </Link>
                    ) : (
                        <p className="hidden"></p>
                    )}
                </div>
            </div>
            <div className="flex items-center">
                {isLoggedIn && (
                    <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded mr-3"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                )}
                {isLoggedIn && (
                    <Link to="/userpanel">
                        <h4 className="mr-4 hover:text-gray-900 border-b-2 border-transparent hover:border-gray-900 font-bold transition duration-300 ease-in-out">UserPanel</h4>
                    </Link>
                )}
                {!isLoggedIn && (
                    <Link to="/login" className="ml-4 hover:text-gray-900">
                        <h2 className="mr-4 hover:text-gray-900 border-b-2 border-transparent hover:border-gray-900 font-bold transition duration-300 ease-in-out">Login</h2>
                    </Link>
                )}
                {!isLoggedIn && (
                    <Link to="/register" className="ml-4 hover:text-gray-900">
                        <h2 className="mr-4 hover:text-gray-900 border-b-2 border-transparent hover:border-gray-900 font-bold transition duration-300 ease-in-out">Cadastre-se</h2>
                    </Link>
                )}
                <div className={styles.theme_selector}>
                    <input
                        className={styles.input}
                        type="checkbox"
                        id="switch"
                        onChange={handleThemeChange}
                        value={theme === "dark" ? "dark" : "light"}
                        checked={theme === "dark"}
                    />
                    <label htmlFor="switch" className={styles.label}>Toggle</label>
                </div>
            </div>
        </header>
    );
};

export default Header;
