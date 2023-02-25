import React, { useState } from "react";
import "./cookies.css";

export default function Cookies() {
    const [showCookies, setShowCookies] = useState(true);

    const handleAccept = () => {
        setShowCookies(false);
        sessionStorage.setItem("cookieAccepted", true);
    };

    if (!sessionStorage.getItem("cookieAccepted") && showCookies) {
        return (
            <div className="cookie-container">
                <div className="cookie-text">
                    Utilizamos cookies para que você tenha a melhor experiência em nosso site. Ao continuar em nossa página, você aceitará os nossos termos de usuário!
                </div>
                <button className=" bg-gray-600 p-2 rounded-lg" onClick={handleAccept}>Concordo</button>
            </div>
        );
    }

    return null;
}
