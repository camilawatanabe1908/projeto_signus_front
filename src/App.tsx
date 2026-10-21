import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Login } from "./pages/Login";
import { Cadastro } from "./pages/Cadastro";
import { Home } from "./pages/Home";
import { RotaProtegida } from "./components/RotaProtegida";

function App() {
  return (
    <BrowserRouter>
      <Routes>
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
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;