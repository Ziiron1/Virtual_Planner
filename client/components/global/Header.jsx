import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import styles from "../User/styles.module.css";
import dark from "../User/assets/dark.jpg";
import light from "../User/assets/light.jpg";
import Logo from "../../assets/images/Logo.png";

const Header = () => {
  const [theme, setTheme] = useState(
    window.localStorage.getItem("theme") || "dark"
  );

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://kit.fontawesome.com/7f335cf7b9.js";
    script.crossOrigin = "anonymous";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    try {
      const illustration = document.getElementById("illustration");
      illustration.style.backgroundImage = `url(${theme === "dark" ? dark : light
        })`;
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
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
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
    <header className="flex justify-between items-center py-3 px-6 bg-header-1">
      <div className="flex items-center">
        <a href="/">
          <img alt="Logo" className="h-8 mr-4" src={Logo} />
        </a>
        <div className="flex items-center">
          <a href="/calendar" className="ml-4 hover:text-gray-900">
            <h2 className="mr-4 hover:text-gray-900 border-b-2 border-transparent hover:border-gray-900 border-gray-900 font-bold ">
              Planner App
            </h2>
          </a>
          {isAdmin === "true" ? (
            <a href="/admin" className="ml-4 hover:text-gray-900">
              <h2 className="mr-4 hover:text-gray-900 border-b-2 border-transparent hover:border-gray-900 font-bold transition duration-300 ease-in-out">
                Admin
              </h2>
            </a>
          ) : (
            <p className="hidden"></p>
          )}
        </div>
      </div>
      <div className="flex items-center">

        <a href="/" className="ml-4 hover:text-gray-900">
          <h2 className="mr-4 hover:text-gray-900 border-b-2 border-transparent hover:border-gray-900 font-bold transition duration-300 ease-in-out">
            Home
          </h2>
        </a>
        <a href="#" className="ml-4 hover:text-gray-900">
          <h2 className="mr-4 hover:text-gray-900 border-b-2 border-transparent hover:border-gray-900 font-bold transition duration-300 ease-in-out">
            Sobre
          </h2>
        </a>
        <a href="#" className="ml-4 hover:text-gray-900">
          <h2 className="mr-4 hover:text-gray-900 border-b-2 border-transparent hover:border-gray-900 font-bold transition duration-300 ease-in-out">
            Contato
          </h2>
        </a>

        <div className="border-l-4 border-red-700 mr-2 max-w-full">|</div>

        {isLoggedIn && (
          <button
            className="bg-purple-700 hover:bg-purple-400 text-white font-bold py-1 px-2 rounded mr-3"
            onClick={handleLogout}
          >
            Logout
          </button>
        )}
        {isLoggedIn && (
          <a href="/userpanel">
            <h4 className="mr-4 hover:text-gray-900 border-b-2 border-transparent hover:border-gray-900 font-bold transition duration-300 ease-in-out">
              UserPanel
            </h4>
          </a>
        )}
        {!isLoggedIn && (
          <a href="/login" className="ml-4 hover:text-gray-900">
            <h2 className="border-l-2 border-cyan-300 mr-4 hover:text-gray-900 border-b-2 border-transparent hover:border-gray-900 font-bold transition duration-300 ease-in-out">
              Login
            </h2>
          </a>
        )}
        {!isLoggedIn && (
          <a href="/register" className="ml-4 hover:text-gray-900">
            <h2 className="mr-4 hover:text-gray-900 border-b-2 border-transparent hover:border-gray-900 font-bold transition duration-300 ease-in-out">
              Cadastre-se
            </h2>
          </a>
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
          <label htmlFor="switch" className={styles.label}>
            Toggle
          </label>
        </div>
      </div>
    </header>
  );
};

export default Header;
