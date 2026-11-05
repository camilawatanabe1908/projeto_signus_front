import { useUsuario } from "../contexts/UsuarioContext";

export function Home() {
    const { usuario } = useUsuario();

    return (
        <div>
            <h1>Painel</h1>
            <p>Olá, {usuario?.nome}</p>
        </div>
    );
}