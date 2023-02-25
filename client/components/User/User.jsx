import { useEffect, useState } from "react";
import Cookies from "js-cookie";

function WelcomeMessage() {
    const [username, setUsername] = useState("");

    useEffect(() => {
        const storedUsername = Cookies.get("Username");
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    return (
        <div className="bg-gray-200 p-4 rounded-md w-80">
            {username && (
                <p className="font-bold text-lg border-b border-gray-300 pb-2">
                    Bem-vindo ao seu planner, {username}!
                </p>
            )}
        </div>
    );
}

export default WelcomeMessage;
