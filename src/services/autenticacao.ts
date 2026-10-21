import { api } from "./api";

export interface Usuario {
  id: number;
  nome: string;
  email: string;
  perfil: string;
}

interface RespostaLogin {
  accessToken: string;
  usuario: Usuario;
}

export function cadastrar(dados: {
  nome: string;
  email: string;
  cpf: string;
  senha: string;
  confirmacaoSenha: string;
}) {
  return api<Usuario>("/usuarios", {
    method: "POST",
    body: JSON.stringify(dados),
  });
}

export async function login(email: string, senha: string) {
  const resposta = await api<RespostaLogin>("/autenticacao/login", {
    method: "POST",
    body: JSON.stringify({ email, senha }),
  });

  localStorage.setItem("token", resposta.accessToken);
  localStorage.setItem("usuario", JSON.stringify(resposta.usuario));
  return resposta.usuario;
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("usuario");
}

export function estaLogado() {
  return localStorage.getItem("token") !== null;
}

export function obterUsuario(): Usuario | null {
  try {
    const texto = localStorage.getItem("usuario");
    return texto ? (JSON.parse(texto) as Usuario) : null;
  } catch {
    return null;
  }
}