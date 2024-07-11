import { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import IUsuario from '../../interfaces/IUsuario';
import getToken, { getAlbums, getPlaylists, getUserId } from '../../api/SpotifyApi';
import styles from './Home.module.scss';
import Login from '../Login';
import Perfil from '../../components/Perfil';
import ICard from '../../interfaces/ICard';
import ExibirConteudo from '../../components/ExibirConteudo';
import IExibirAlbum from '../../interfaces/IExibirAlbum';
import IExibirPlaylist from '../../interfaces/IExibirPlaylist';



const Home = () => {
  const [exibindoAlbum, setExibindoAlbum] = useState<IExibirAlbum>({album:{images:[{url:""}], name: "", tracks:{items:[{name: "", preview_url: ""}]}, type:"" , exibir:false}});
  const [exibindoPlaylist, setExibindoPlaylist] = useState<IExibirPlaylist>({images:[{url:""}], name: "", tracks:{items:[{track:{name: "", preview_url: ""}}]}, type:"", exibir:false });
  const [usuarioLogado, setUsuarioLogado] = useState<IUsuario>({ nome: "", userid: "", foto:[]})
  const [userPlaylist, setUserPlaylist] = useState<Array<ICard>>([])
  const [userAlbums, setUserAlbums] = useState<Array<ICard>>([])
  let code = localStorage.getItem('code_verifier')
  let token = localStorage.getItem('access_token')
  useEffect(() => {
    if (code && token == null) getToken();
    getUserId(setUsuarioLogado);
    getPlaylists(setUserPlaylist);
    getAlbums(setUserAlbums);
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
        <Sidebar playlists={userPlaylist} albums={userAlbums} exibindoAlbum={setExibindoAlbum} exibindoPlaylist={setExibindoPlaylist}/>
        <div className={styles.inicio}>
          <Perfil usuario={usuarioLogado} />
          <div className={styles.conteudo}>
            <ExibirConteudo exibirAlbum={exibindoAlbum} exibirPlaylist={exibindoPlaylist}/>
          </div>
        </div>
      </div>
    );
};

export default Home;