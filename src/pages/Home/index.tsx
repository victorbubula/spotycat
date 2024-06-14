import { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import IUsuario from '../../interfaces/IUsuario';
import getToken from '../../api/SpotifyApi';

const Home = () => {
  const [usuarioLogado, setUsuarioLogado] = useState<IUsuario>({ nome: "", userid: "" })
  const [userPlaylist, setUserPlaylist] = useState("")

  useEffect(() => {

    getToken(setUsuarioLogado, setUserPlaylist);
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
    removerParametrosEspecificosDaURL(window.location.href, ['?', 'code']);

  }, []);
  return (
    <div className='main'>
      <Sidebar />
      <h1>ola {usuarioLogado.nome}</h1>
      <p>{userPlaylist}</p>
    </div>
  );
};

export default Home;