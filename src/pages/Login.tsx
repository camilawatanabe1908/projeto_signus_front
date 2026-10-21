import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import type { FormEvent } from "react";
import { validarEmail } from "../utils/validacoes";
import { Input } from "../components/Input";
import { login } from "../services/autenticacao";
import { ApiError } from "../services/api";

export function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [erroEmail, setErroEmail] = useState("");
    const [erroSenha, setErroSenha] = useState("");
    const [erroGeral, setErroGeral] = useState("");
    const [enviando, setEnviando] = useState(false);

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();
        setErroGeral("");

        let temErro = false;

        if (email === "") {
            setErroEmail("Informe o e-mail.");
            temErro = true;
        } else if (!validarEmail(email)) {
            setErroEmail("E-mail inválido.");
            temErro = true;
        } else {
            setErroEmail("");
        }

        if (senha === "") {
            setErroSenha("Informe a senha.");
            temErro = true;
        } else if (senha.length < 8) {
            setErroSenha("A senha deve ter pelo menos 8 caracteres.");
            temErro = true;
        } else {
            setErroSenha("");
        }

        if (temErro) {
            return;
        }

        setEnviando(true);
        try {
            await login(email, senha);
            navigate("/home"); 
        } catch (erro) {
            setErroGeral(
                erro instanceof ApiError ? erro.message : "Erro inesperado. Tente novamente."
            );
        } finally {
            setEnviando(false);
        }
    }

    return (
        <div className="app">
            <h1>Entrar</h1>

            <form onSubmit={handleSubmit} noValidate>
                <Input
                    type="email"
                    placeholder="Digite seu e-mail"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    erro={erroEmail}
                />

                <Input
                    type="password"
                    placeholder="Digite sua senha"
                    value={senha}
                    onChange={(event) => setSenha(event.target.value)}
                    erro={erroSenha}
                />

                {erroGeral && <p role="alert">{erroGeral}</p>}

                <button type="submit" disabled={enviando}>
                    {enviando ? "Entrando..." : "Entrar"}
                </button>
            </form>
            <p>
                Não tem conta? <Link to="/cadastro">Cadastre-se</Link>
            </p>
        </div>
    );
}