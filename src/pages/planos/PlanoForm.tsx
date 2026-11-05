import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Input } from "../../components/Input";
import { Botao } from "../../components/Botao";
import { atualizarPlano, buscarPlano, criarPlano } from "../../services/planos";
import { ApiError } from "../../services/api";
import { mascararMoeda, moedaParaNumero } from "../../utils/mascaras";

type FormPlano = {
    nome: string;
    descricao: string;
    valorBase: string;
    ativo: boolean;
};

type Erros = {
    nome?: string;
};

const formVazio: FormPlano = {
    nome: "",
    descricao: "",
    valorBase: "",
    ativo: true,
};

export function PlanoForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState<FormPlano>(formVazio);
    const [erros, setErros] = useState<Erros>({});
    const [erroGeral, setErroGeral] = useState("");
    const [carregando, setCarregando] = useState(id !== undefined);
    const [enviando, setEnviando] = useState(false);

    useEffect(() => {
        if (id === undefined) {
            return;
        }

        let ativo = true;

        buscarPlano(Number(id))
            .then((plano) => {
                if (ativo) {
                    setForm({
                        nome: plano.nome,
                        descricao: plano.descricao ?? "",
                        valorBase:
                            plano.valorBase === null
                                ? ""
                                : mascararMoeda(String(Math.round(plano.valorBase * 100))),
                        ativo: plano.ativo,
                    });
                    setCarregando(false);
                }
            })
            .catch((erroApi) => {
                if (ativo) {
                    setErroGeral(
                        erroApi instanceof ApiError
                            ? erroApi.message
                            : "Erro inesperado. Tente novamente."
                    );
                    setCarregando(false);
                }
            });

        return () => {
            ativo = false;
        };
    }, [id]);

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();
        setErroGeral("");

        const novosErros: Erros = {};
        const nome = form.nome.trim();

        if (nome === "") {
            novosErros.nome = "Informe o nome.";
        } else if (nome.length < 3 || nome.length > 80) {
            novosErros.nome = "O nome deve ter entre 3 e 80 caracteres.";
        }

        setErros(novosErros);

        if (Object.keys(novosErros).length > 0) {
            return;
        }

        const dados = {
            nome,
            descricao: form.descricao.trim(),
            valorBase: moedaParaNumero(form.valorBase),
            ativo: form.ativo,
        };

        setEnviando(true);
        try {
            if (id === undefined) {
                await criarPlano(dados);
            } else {
                await atualizarPlano(Number(id), dados);
            }
            navigate("/admin/planos");
        } catch (erroApi) {
            setErroGeral(
                erroApi instanceof ApiError
                    ? erroApi.message
                    : "Erro inesperado. Tente novamente."
            );
        } finally {
            setEnviando(false);
        }
    }

    if (carregando) {
        return <p role="status">Carregando...</p>;
    }

    return (
        <div>
            <h1>{id === undefined ? "Novo plano" : "Editar plano"}</h1>

            <form onSubmit={handleSubmit} noValidate className="formulario">
                <Input
                    type="text"
                    placeholder="Nome"
                    value={form.nome}
                    onChange={(event) => setForm({ ...form, nome: event.target.value })}
                    erro={erros.nome}
                />

                <Input
                    type="text"
                    placeholder="Descrição"
                    value={form.descricao}
                    onChange={(event) => setForm({ ...form, descricao: event.target.value })}
                />

                <Input
                    type="text"
                    placeholder="Valor base (opcional)"
                    value={form.valorBase}
                    onChange={(event) =>
                        setForm({ ...form, valorBase: mascararMoeda(event.target.value) })
                    }
                />

                <label className="campo-check">
                    <input
                        type="checkbox"
                        checked={form.ativo}
                        onChange={(event) => setForm({ ...form, ativo: event.target.checked })}
                    />
                    Ativo
                </label>

                {erroGeral && (
                    <p role="alert" className="form-alert">
                        {erroGeral}
                    </p>
                )}

                <div className="form-actions">
                    <Botao type="submit" disabled={enviando}>
                        Salvar
                    </Botao>
                    <Link to="/admin/planos">Cancelar</Link>
                </div>
            </form>
        </div>
    );
}