
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Autenticacao from "./pages/autenticacao";
import Home from "./pages/Home";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
        <Route index element={<Home/>}/>
        <Route path="autenticacao" element={<Autenticacao />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};