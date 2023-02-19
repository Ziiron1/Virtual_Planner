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
        <div>
            <div style={{ padding: "30px 0px 30px 10px", width: "400px" }}>
                {username && <p style={{ fontWeight: "bold", fontSize: "18px", borderBottom: "1px #252525 solid" }}>Bem-vindo ao seu planner, {username}!</p>}
            </div>
        </div>
    );
}

export default WelcomeMessage;
