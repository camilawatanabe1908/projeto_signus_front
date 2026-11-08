export const PERFIL_CLIENTE = "CLIENTE";

export function rotaInicial(perfil: string) {
    return perfil === PERFIL_CLIENTE ? "/cliente" : "/admin/home";
}