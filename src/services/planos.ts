import { api } from "../api/axios";
import type { Pagina } from "../types/pagina";

export type Plano = {
    id: number;
    nome: string;
    descricao: string | null;
    valorBase: number | null;
    ativo: boolean;
};

export type DadosPlano = {
    nome: string;
    descricao: string;
    valorBase: number | null;
    ativo: boolean;
};

export async function listarPlanos(pagina: number, limite = 10) {
    const resposta = await api.get<Pagina<Plano>>("/planos", {
        params: { pagina, limite },
    });
    return resposta.data;
}

export async function buscarPlano(id: number) {
    const resposta = await api.get<Plano>(`/planos/${id}`);
    return resposta.data;
}

export async function criarPlano(dados: DadosPlano) {
    const resposta = await api.post<Plano>("/planos", dados);
    return resposta.data;
}

export async function atualizarPlano(id: number, dados: DadosPlano) {
    const resposta = await api.put<Plano>(`/planos/${id}`, dados);
    return resposta.data;
}

export async function excluirPlano(id: number) {
    await api.delete(`/planos/${id}`);
}