
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Autenticacao from "./pages/autenticacao";
import Home from "./pages/home";


export default function App() {
    return (
      <BrowserRouter>
        <Routes>
            
        <Route path='/'>
					<Route index element={<Login/>} />
          <Route path="autenticacao" element={<Autenticacao/>}/>
					<Route path='home' element={<Home/>}/>
				</Route>


        </Routes>
      </BrowserRouter>
    );
  };