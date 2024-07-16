import ICard from "../../interfaces/ICard";
import styles from "./Sidebar.module.scss";
import Biblioteca from "./Biblioteca";
import IExibirAlbum from "../../interfaces/IExibirAlbum";
import { useEffect, useState } from "react";
import { getPlaylists } from "../../api/SpotifyApi";
interface props {
    exibindoAlbum: React.Dispatch<React.SetStateAction<IExibirAlbum>>
}

const Sidebar = ({exibindoAlbum}: props) => {
    const [userPlaylist, setUserPlaylist] = useState<Array<ICard>>([])
    const [userAlbum, setUserAlbum] = useState<Array<ICard>>([])
    function pesquisar(value: string) {
        value.toLowerCase()
        setUserAlbum(userAlbum.filter(album => album.nome.toLowerCase().includes(value)))
        setUserPlaylist(userPlaylist.filter(playlist => playlist.nome.toLowerCase().includes(value)))
    }
    useEffect(()=>{
        getPlaylists("playlist", setUserPlaylist);
        getPlaylists("album", setUserAlbum);
    },[])
    return (
        <div className={styles.container}>
            <div className={styles.inicio}>
                <span className={styles.inicio_icone}></span>
                <h1 className={styles.inicio_titulo}>Início</h1>
            </div>
            <Biblioteca playlists={userPlaylist} albums={userAlbum} exibindoAlbum={exibindoAlbum} pesquisar={pesquisar} />
        </div>
    )
}

export default Sidebar