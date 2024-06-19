import IPlaylists from "../interfaces/IPlaylists";
import IUsuario from "../interfaces/IUsuario";
const clientId: string = 'ea4f5c69626c4ac4a248c6e5f01ebe87';
let tokRefresh = "";
let expiresIn = 3600
let tokenExpirado = false

const url: string = "https://accounts.spotify.com/api/token"
export default async function getToken() {

  const redirectUri: string = 'http://localhost:5173/home'

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

  tokRefresh = response.refresh_token;
  expiresIn = response.expires_in;
  tokenExpirado = false;
  localStorage.setItem('access_token', response.access_token);
  setTimeout(() => {
    tokenExpirado = true
  }, expiresIn)

}

export const getUserId = async (setUsuarioLogado: React.Dispatch<React.SetStateAction<IUsuario>>) => {
  if (tokenExpirado) await getRefreshToken()
  let tokenacesso = localStorage.getItem("access_token")
  const userID = {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      'Authorization': 'Bearer ' + tokenacesso
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
  if (tokenExpirado) await getRefreshToken()
  let tokenacesso = localStorage.getItem("access_token")
  const userID = {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      'Authorization': 'Bearer ' + tokenacesso
    }
  }

  const body = await fetch("https://api.spotify.com/v1/me/playlists", userID);
  const response = await body.json();
  const playlist = response.items.map((item: IPlaylists) => `${item.name} `)
  setUserPlaylist(playlist)
}

const getRefreshToken = async () => {
  const refresh = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: clientId,
      grant_type: 'refresh_token',
      refresh_token: tokRefresh
    })
  }
  const body = await fetch(url, refresh);
  const response = await body.json();
  localStorage.setItem('access_token', response.access_token)
  tokRefresh = response.refresh_token;
  expiresIn = response.expires_in;
  tokenExpirado = false

  setTimeout(() => {
    tokenExpirado = true
  }, expiresIn)
}

