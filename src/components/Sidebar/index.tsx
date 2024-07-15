import ICard from "../../interfaces/ICard";
import styles from "./Sidebar.module.scss";
import Biblioteca from "./Biblioteca";
import IExibirAlbum from "../../interfaces/IExibirAlbum";
interface props {
    playlists: Array<ICard>
    albums:Array<ICard>
    exibindoAlbum: React.Dispatch<React.SetStateAction<IExibirAlbum>>
}

const Sidebar = ({ playlists, albums, exibindoAlbum}: props) => {

    return (
        <div className={styles.container}>
            <div className={styles.inicio}>
                <span className={styles.inicio_icone}></span>
                <h1 className={styles.inicio_titulo}>Início</h1>
            </div>
            <Biblioteca playlists={playlists} albums={albums} exibindoAlbum={exibindoAlbum} />
        </div>
    )
}

export default Sidebar