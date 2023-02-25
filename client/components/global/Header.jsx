import React from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

const Header = () => {
    function handleLogout() {
        Cookies.remove("token");
        Cookies.remove("id_user");
        Cookies.remove("Username");
        Cookies.remove("is_Admin");

        setTimeout(() => {
            window.location.assign("/login");
        }, 200);
    }

    const isLoggedIn =
        Cookies.get("token") &&
        Cookies.get("id_user") &&
        Cookies.get("Username") &&
        Cookies.get("is_Admin");

    return (
        <header className="flex justify-between items-center py-4 px-6">
            <div className="flex items-center">
                <Link to="/">
                    <img alt="Logo" className="h-8 mr-4" src="/path/to/logo.png" />
                </Link>
                <div className="flex items-center">
                    <Link to="/calendar" className="ml-4 text-gray-700 hover:text-gray-900">
                        <h2 className="mr-4 text-gray-700 hover:text-gray-900 border-b-2 border-transparent hover:border-gray-900 font-bold transition duration-300 ease-in-out">Planner App</h2>
                    </Link>
                    <Link to="/admin" className="ml-4 text-gray-700 hover:text-gray-900">
                        <h2 className="mr-4 text-gray-700 hover:text-gray-900 border-b-2 border-transparent hover:border-gray-900 font-bold transition duration-300 ease-in-out">Admin</h2>
                    </Link>
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
                        <h4 className="mr-4 text-gray-700 hover:text-gray-900 border-b-2 border-transparent hover:border-gray-900 font-bold transition duration-300 ease-in-out">UserPanel</h4>
                    </Link>
                )}
                <Link to="/login" className="ml-4 text-gray-700 hover:text-gray-900">
                    <h2 className="mr-4 text-gray-700 hover:text-gray-900 border-b-2 border-transparent hover:border-gray-900 font-bold transition duration-300 ease-in-out">Login</h2>
                </Link>
                <Link to="/cadastro" className="ml-4 text-gray-700 hover:text-gray-900">
                    <h2 className="mr-4 text-gray-700 hover:text-gray-900 border-b-2 border-transparent hover:border-gray-900 font-bold transition duration-300 ease-in-out">Cadastre-se</h2>
                </Link>
            </div>
        </header>
    );
};

export default Header;
