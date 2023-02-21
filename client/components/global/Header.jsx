import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./theme.css"
import Cookies from "js-cookie";

const Header = () => {
    const [theme, setTheme] = useState("light");

    // Carrega o tema atual do localStorage ao montar o componente
    useEffect(() => {
        const storedTheme = localStorage.getItem("theme");
        if (storedTheme) setTheme(storedTheme);
    }, []);

    function toggleTheme() {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
        document.body.classList.toggle("dark");
    }

    function handleLogout() {
        Cookies.remove("token");
        Cookies.remove("id_user");
        Cookies.remove("Username");
        Cookies.remove("is_Admin");

        setTimeout(() => {
            window.location.assign("/login")
        }, 200);
    }

    const isLoggedIn =
        Cookies.get("token") &&
        Cookies.get("id_user") &&
        Cookies.get("Username") &&
        Cookies.get("is_Admin");

    return (
        <header className={`header ${theme}`}>
            <div className="logo">
                <Link to="/">
                    <h2>Home</h2>
                </Link>
                <Link to="/calendar">
                    <h2>Planner App</h2>
                </Link>
                <Link to="/admin">
                    <h2>Admin</h2>
                </Link>
            </div>
            <div className="nav">
                {isLoggedIn && (
                    <button className="logout" onClick={handleLogout}>
                        Logout
                    </button>
                )}
                <Link to="/userpanel">
                    <h4>UserPanel</h4>
                </Link>
                <button className="theme-toggle" onClick={toggleTheme}>
                    {theme === "light" ? "Dark" : "Light"} Theme
                </button>
            </div>
        </header>
    );
};

export default Header;
