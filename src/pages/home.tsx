import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import IUsuario from '../interfaces/IUsuario';
import getToken from '../api/SpotifyApi';



const Home = () => {
  const [usuarioLogado, setUsuarioLogado] = useState<IUsuario>({nome:"", userid: ""})
  const clientId: string = 'ea4f5c69626c4ac4a248c6e5f01ebe87';
  const redirectUri: string = 'http://localhost:5173/home'
  const url: string = "https://accounts.spotify.com/api/token"

  useEffect(() => {

    let codeVerifier = localStorage.getItem('code_verifier');
    if (codeVerifier == null) {
      codeVerifier = ""
    }
    let params = new URLSearchParams(document.location.search)
    let code = params.get("code")
    if (code == null) {
      code = ""
    }
   
    getToken(code, clientId, codeVerifier, redirectUri, url, setUsuarioLogado)
    

  }, []);
 console.log(usuarioLogado)
  return (
    <div className='main'>
      <Sidebar />
      <h1>ola {usuarioLogado.nome}</h1>
    </div>
  );
};

export default Home;