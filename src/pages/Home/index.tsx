import { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import IUsuario from '../../interfaces/IUsuario';
import getToken, { getUserId } from '../../api/SpotifyApi';
import styles from './Home.module.scss';
import Login from '../Login';
import Perfil from '../../components/Perfil';
import ExibirConteudo from '../../components/ExibirConteudo';
import IExibirAlbum from '../../interfaces/IExibirAlbum';

const Home = () => {
  const [exibindoAlbum, setExibindoAlbum] = useState<IExibirAlbum>({
    imagem: "",
    nome: "",
    artista:"",
    musicas: [{ name: "", preview_url: "" }],
    tipo: ""
  });
  const [usuarioLogado, setUsuarioLogado] = useState<IUsuario>({ nome: "", userid: "", foto: [] })
  let code = localStorage.getItem('code_verifier')
  let token = localStorage.getItem('access_token')
  useEffect(() => {
    if (code && token == null) getToken();
    getUserId(setUsuarioLogado);
    
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
  return (!code && !token) ?
    (
      <Login />
    ) :
    (
      <div className={styles.container}>
        <Sidebar exibindoAlbum={setExibindoAlbum}/>
        <div className={styles.inicio}>
          <Perfil usuario={usuarioLogado} />
          <ExibirConteudo exibirAlbum={exibindoAlbum} />
        </div>
      </div>
    );
};

export default Home;