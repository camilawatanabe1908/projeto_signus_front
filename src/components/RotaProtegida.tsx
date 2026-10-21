import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { estaLogado } from "../services/autenticacao";

export function RotaProtegida({ children }: { children: ReactNode }) {
    if (!estaLogado()) {
        return <Navigate to="/login" replace />;
    }
    return <>{children}</>;
}