import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import IUsuario from '../interfaces/IUsuario';
import getToken from '../api/SpotifyApi';



const Home = () => {
  const [usuarioLogado, setUsuarioLogado] = useState<IUsuario>({ nome: "", userid: "" })
  const [userPlaylist, setUserPlaylist] = useState("")
  const clientId: string = 'ea4f5c69626c4ac4a248c6e5f01ebe87';
  const redirectUri: string = 'https://spotycat.vercel.app/home'
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

    getToken(code, clientId, codeVerifier, redirectUri, url, setUsuarioLogado, setUserPlaylist)
    function removerParametrosEspecificosDaURL(url: string, parametrosParaRemover: string[]) {
      // Criando um objeto URL a partir da URL fornecida
      const urlObj = new URL(url);
      // Iterando pelos parâmetros fornecidos e removendo-os da URL
      parametrosParaRemover.forEach((param) => {
        urlObj.searchParams.delete(param);
      });
      // Atualizando a URL atual no histórico do navegador
      window.history.replaceState({}, '', urlObj.toString());
    }
    // Exemplo de uso:
    removerParametrosEspecificosDaURL(window.location.href, ['?', 'code']);

  }, []);
  console.log(usuarioLogado)
  return (
    <div className='main'>
      <Sidebar />
      <h1>ola {usuarioLogado.nome}</h1>
      <p>{userPlaylist}</p>
    </div>
  );
};

export default Home;