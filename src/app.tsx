
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Autenticacao from "./pages/autenticacao";
import Home from "./pages/Home";
import Login from "./pages/Login";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="home" element={<Home />} />
        <Route path="autenticacao" element={<Autenticacao />} />
      </Routes>
    </BrowserRouter>
  );
};