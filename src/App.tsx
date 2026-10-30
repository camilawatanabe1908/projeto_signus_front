import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Login } from "./pages/Login";
import { Cadastro } from "./pages/Cadastro";
import { Home } from "./pages/Home";
import { RotaProtegida } from "./components/RotaProtegida";
import { SiteLayout } from "./components/site/SiteLayout";
import { Inicio } from "./pages/site/Inicio";
import { Galeria } from "./pages/site/Galeria";
import { Orcamento } from "./pages/site/Orcamento";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route path="/" element={<Inicio />} />
          <Route path="/galeria" element={<Galeria />} />
          <Route path="/orcamento" element={<Orcamento />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route
          path="/home"
          element={
            <RotaProtegida>
              <Home />
            </RotaProtegida>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;