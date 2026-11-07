import type { StatusEvento } from "../services/eventos";

export const rotulosStatus: Record<StatusEvento, string> = {
    ORCAMENTO: "Orçamento",
    CONFIRMADO: "Confirmado",
    EM_PREPARACAO: "Em preparação",
    CONCLUIDO: "Concluído",
    CANCELADO: "Cancelado",
};

export function formatarDataHora(texto: string) {
    const partes = texto.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/);

    if (!partes) {
        return texto;
    }

    const [, ano, mes, dia, hora, minuto] = partes;
    return `${dia}/${mes}/${ano} ${hora}:${minuto}`;
}

export const proximosStatus: Record<StatusEvento, StatusEvento[]> = {
    ORCAMENTO: ["CONFIRMADO", "CANCELADO"],
    CONFIRMADO: ["EM_PREPARACAO", "CANCELADO"],
    EM_PREPARACAO: ["CONCLUIDO", "CANCELADO"],
    CONCLUIDO: [],
    CANCELADO: [],
};