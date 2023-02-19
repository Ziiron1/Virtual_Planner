import React, { useState } from "react";

function UserPanel() {
    const [showPlanner, setShowPlanner] = useState(false);
    const [plannerData, setPlannerData] = useState({});

    function handleEditPlanner(planner) {
        setShowPlanner(true);
        setPlannerData(planner);
    }

    return (
        <div className="user-panel">
            <div className="user-info">
                {/* renderiza as informações do usuário */}
            </div>
            {showPlanner && (
                <div className="planner-details">
                    {/* renderiza os detalhes do planner */}
                    <PlannerDetails planner={plannerData} />
                </div>
            )}
            <div className="planner-list">
                {/* renderiza a lista de planners */}
                {user.planners.map((planner) => (
                    <div key={planner.id} className="planner-item">
                        <h3>{planner.title}</h3>
                        <button onClick={() => handleEditPlanner(planner)}>Editar</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

function PlannerDetails({ planner }) {
    const [title, setTitle] = useState(planner.title);
    const [content, setContent] = useState(planner.content);
    const [comments, setComments] = useState(planner.comments);

    function handleSubmit(event) {
        event.preventDefault();
        // envia um PATCH para atualizar o planner no backend
    }

    return (
        <div className="planner-form">
            <form onSubmit={handleSubmit}>
                <label>
                    Título:
                    <input
                        type="text"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                    />
                </label>
                <label>
                    Conteúdo:
                    <textarea
                        value={content}
                        onChange={(event) => setContent(event.target.value)}
                    />
                </label>
                <label>
                    Comentários:
                    <textarea
                        value={comments}
                        onChange={(event) => setComments(event.target.value)}
                    />
                </label>
                <button type="submit">Salvar</button>
            </form>
        </div>
    );
}
