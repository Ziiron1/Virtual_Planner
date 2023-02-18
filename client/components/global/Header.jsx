import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./theme.css"

const Header = () => {
    const navigate = useNavigate();
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
        localStorage.removeItem("token");
        localStorage.removeItem("id_user");
        localStorage.removeItem("Username");

        setTimeout(() => {
            navigate("/login");
        }, 500);
    }

    const isLoggedIn =
        localStorage.getItem("token") &&
        localStorage.getItem("id_user") &&
        localStorage.getItem("Username");

    return (
        <header className={`header ${theme}`}>
            <div className="logo">
                <Link to="/">
                    <h1>My App</h1>
                </Link>
                <Link to="/calendar">
                    <h1>Planner</h1>
                </Link>
            </div>
            <div className="nav">
                {isLoggedIn && (
                    <button className="logout" onClick={handleLogout}>
                        Logout
                    </button>
                )}
                <button className="theme-toggle" onClick={toggleTheme}>
                    {theme === "light" ? "Dark" : "Light"} Theme
                </button>
            </div>
        </header>
    );
};

export default Header;
