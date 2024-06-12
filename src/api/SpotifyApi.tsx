import IUsuario from "../interfaces/IUsuario";

export default async function getToken(code: string, clientId: string, codeVerifier: string, redirectUri: string, url: string, setUsuarioLogado: React.Dispatch<React.SetStateAction<IUsuario>>) {
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
      getPlaylists()
}

const getUserId = async (setUsuarioLogado:React.Dispatch<React.SetStateAction<IUsuario>> ) => {
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