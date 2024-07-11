
import IAlbums from "../interfaces/IAlbums";
import ICard from "../interfaces/ICard";
import IExibirAlbum from "../interfaces/IExibirAlbum";
import IExibirPlaylist from "../interfaces/IExibirPlaylist";
import IPlaylists from "../interfaces/IPlaylists";
import IUsuario, { IFoto } from "../interfaces/IUsuario";
const clientId: string = 'ea4f5c69626c4ac4a248c6e5f01ebe87';
let tokRefresh = "";
let expiresIn = 3600
let tokenExpirado = false
const url: string = "https://accounts.spotify.com/api/token"
export default async function getToken() {

  const redirectUri: string = 'http://localhost:5173'

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
  localStorage.setItem("access_token", response.access_token);
  setTimeout(() => {
    tokenExpirado = true
  }, expiresIn)
  window.location.reload()
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
  const foto = response.images.map((item:IFoto)=> item.url);
  setUsuarioLogado({
    nome: response.display_name,
    userid: response.id,
    foto: foto
  })

}

export const getPlaylists = async (setUserPlaylist: React.Dispatch<React.SetStateAction<Array<ICard>>>) => {
  if (tokenExpirado) await getRefreshToken();
  let tokenacesso = localStorage.getItem("access_token");
  const userID = {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      'Authorization': 'Bearer ' + tokenacesso
    }
  }

  const body = await fetch("https://api.spotify.com/v1/me/playlists", userID);
  const response = await body.json();
  const playlist =  response.items.map((item: IPlaylists) => {return({
    nome:item.name, 
    foto:item.images,
    tipo:item.type,
    artista: "victor",
    id:item.id
  })})
  setUserPlaylist(playlist)
}

export const getAlbums = async (setUserAlbum: React.Dispatch<React.SetStateAction<Array<ICard>>>) => {
  if (tokenExpirado) await getRefreshToken();
  let tokenacesso = localStorage.getItem("access_token");
  const userID = {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      'Authorization': 'Bearer ' + tokenacesso
    }
  }

  const body = await fetch("https://api.spotify.com/v1/me/albums", userID);
  const response = await body.json();
  
  const album = response.items.map((item: IAlbums) => {return({
    nome:item.album.name, 
    foto:item.album.images,
    tipo:item.album.type,
    artista:item.album.artists[0].name,
    id:item.album.id
  })})
  setUserAlbum(album)
  console.log(response)
}

export const getTracks = async (tipo: string, id: string, exibindoAlbum: React.Dispatch<React.SetStateAction<IExibirAlbum>>, exibindoPlaylist:React.Dispatch<React.SetStateAction<IExibirPlaylist>> ) => {
  if (tokenExpirado) await getRefreshToken();
  let tokenacesso = localStorage.getItem("access_token");
  const userID = {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      'Authorization': 'Bearer ' + tokenacesso
    }
  }

  const body = await fetch(`https://api.spotify.com/v1/${tipo}s/${id}`, userID);
  const response = await body.json();
  console.log(response);
  (tipo == "album")?
  exibindoAlbum(response + {exibir: true}): exibindoPlaylist (response+ {exibir: true});
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

