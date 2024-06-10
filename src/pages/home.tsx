import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import IUsuario from '../interfaces/IUsuario';



const Home = () => {
  const [usuarioLogado, setUsuarioLogado] = useState<IUsuario>({nome:"vitor", userid: "dsakdksa"})
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
    let ams = new URLSearchParams(document.location.search)
    ams.delete
    const getToken = async (code: string, clientId: string, codeVerifier: string, redirectUri: string, url: string) => {

      const payload = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          client_id: clientId,
          grant_type: 'authorization_code',
          code,
          redirect_uri: redirectUri,
          code_verifier: codeVerifier,
        }),
      }

      const body = await fetch(url, payload);
      const response = await body.json();

      localStorage.setItem('access_token', response.access_token);
      getUserId()
      getPlaylists()
    }
    getToken(code, clientId, codeVerifier, redirectUri, url)
    const getUserId = async () => {
      let tok = localStorage.getItem("access_token")
      const userID = {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          'Authorization': 'Bearer ' + tok
        }
      }

      const body = await fetch("https://api.spotify.com/v1/me", userID);
      const response = await body.json();

      setUsuarioLogado({
        nome: response.display_name,
        userid: response.id
      })

    }
    const getPlaylists = async () => {
      let tok = localStorage.getItem("access_token")
      const userID = {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          'Authorization': 'Bearer ' + tok
        }
      }

      const body = await fetch("https://api.spotify.com/v1/me/playlists", userID);
      const response = await body.json();
      console.log(response)
    }

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