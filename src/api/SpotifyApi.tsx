import IPlaylists from "../interfaces/IPlaylists";
import IUsuario from "../interfaces/IUsuario";

export default async function getToken(setUsuarioLogado: React.Dispatch<React.SetStateAction<IUsuario>>, setUserPlaylist: React.Dispatch<React.SetStateAction<string>>) {
  const clientId: string = 'ea4f5c69626c4ac4a248c6e5f01ebe87';
  const redirectUri: string = 'http://localhost:5173/home'
  const url: string = "https://accounts.spotify.com/api/token"
  let codeVerifier = localStorage.getItem('code_verifier');
  if (codeVerifier == null) {
    codeVerifier = ""
  }
  let params = new URLSearchParams(document.location.search)
  let code = params.get("code")
  if (code == null) {
    code = ""
  }
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
  getUserId(setUsuarioLogado)
  getPlaylists(setUserPlaylist)
}

const getUserId = async (setUsuarioLogado: React.Dispatch<React.SetStateAction<IUsuario>>) => {
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

export const getPlaylists = async (setUserPlaylist: React.Dispatch<React.SetStateAction<string>>) => {
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
  const playlist = response.items.map((item: IPlaylists) => `${item.name} `)
  setUserPlaylist(playlist)
}