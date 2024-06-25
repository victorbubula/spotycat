import { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import IUsuario from '../../interfaces/IUsuario';
import getToken, { getPlaylists, getUserId } from '../../api/SpotifyApi';
import styles from './Home.module.scss';
import Login from '../Login';
import Perfil from '../../components/Perfil';

const Home = () => {
  const [usuarioLogado, setUsuarioLogado] = useState<IUsuario>({ nome: "", userid: "", foto:[]})
  const [userPlaylist, setUserPlaylist] = useState("")
  let code = localStorage.getItem('code_verifier')
  let token = localStorage.getItem('access_token')
  useEffect(() => {
    
    if (code && token == null) getToken();
    getUserId(setUsuarioLogado);
    getPlaylists(setUserPlaylist);
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
    localStorage.removeItem('code_verifier');
  }, []);
  return (!code&& !token) ?
    (
      <Login />
    ) :
    (
      <div className={styles.container}>
        
        <Perfil usuario={usuarioLogado} />
        <Sidebar/>
        <p>{userPlaylist}</p>
      </div>
    );
};

export default Home;