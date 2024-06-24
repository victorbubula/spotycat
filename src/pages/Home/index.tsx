import { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import IUsuario from '../../interfaces/IUsuario';
import getToken, { getPlaylists, getUserId } from '../../api/SpotifyApi';
import styles from './Home.module.scss';
import Login from '../Login';

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
    
  }, []);
  return (!code) ?
    (
      <Login />
    ) :
    (
      <div className={styles.container}>
        <Sidebar />
        <div className={styles.containerperfil}>
          <button>pesqu</button>
          <button>sino</button>
          <div className={styles.perfil}>
            <p className={styles.nome}>{usuarioLogado.nome}</p>
            {(usuarioLogado.foto.length != 0)? <div><img className={styles.foto} src={usuarioLogado.foto[0]} alt="aaaa" /></div> :<h1 className={styles.letra}>{usuarioLogado.nome.charAt(0)}</h1>}
          </div>
        </div>
        
        <p>{userPlaylist}</p>
      </div>
    );
};

export default Home;