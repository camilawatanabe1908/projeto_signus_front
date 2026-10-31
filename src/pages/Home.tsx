import { useNavigate } from "react-router-dom";
import { logout, obterUsuario } from "../services/autenticacao";

export function Home() {
    const navigate = useNavigate();
    const usuario = obterUsuario();

    function handleSair() {
        logout();
        navigate("/admin/login");
    }

    return (
        <div className="app">
            <h1>Área logada</h1>
            <p>Login realizado com sucesso.</p>
            <p>Olá, {usuario?.nome}</p>
            <button onClick={handleSair}>Sair</button>
        </div>
    );
}