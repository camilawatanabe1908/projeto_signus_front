const API_URL = import.meta.env.VITE_API_URL ?? "/api";

export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export async function api<T>(
  caminho: string,
  opcoes: RequestInit = {}
): Promise<T> {
  const token = localStorage.getItem("token");

  let resposta: Response;
  try {
    resposta = await fetch(`${API_URL}${caminho}`, {
      ...opcoes,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...opcoes.headers,
      },
    });
  } catch {
    throw new ApiError(0, "Não foi possível conectar ao servidor.");
  }

  const corpo = await resposta.json().catch(() => null);

  if (!resposta.ok) {
    if (
      resposta.status === 401 &&
      token &&
      caminho !== "/autenticacao/login"
    ) {
      localStorage.removeItem("token");
      localStorage.removeItem("usuario");
      window.location.href = "/login";
    }

    const mensagem = Array.isArray(corpo?.message)
      ? corpo.message.join(" ")
      : corpo?.message ?? "Erro inesperado.";
    throw new ApiError(resposta.status, mensagem);
  }

  return corpo as T;
}