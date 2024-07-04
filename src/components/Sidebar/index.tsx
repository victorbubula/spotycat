import ICard from "../../interfaces/ICard";
import styles from "./Sidebar.module.scss";
import img from '../../assets/gato.jpg';
interface props {
    playlists: Array<ICard>
    albums: Array<ICard>
}

const Sidebar = ({ playlists, albums }: props) => {
    
    return (
        <div className={styles.container}>
            <div className={styles.inicio}>
                <p>Inicio</p>
            </div>
            <div className={styles.biblioteca}>
                <p>Sua Biblioteca</p>
                <div className={styles.container_lista}>
                    <div>
                        <input type="search" />
                        <p>filtro</p>
                    </div>
                    <ul className={styles.lista}>
                        {playlists.map((item: ICard) => { return (<li key={item.id} className={styles.card}> <img src={(item.foto==null)?img: item.foto[0].url} alt="" /> <div className={styles.card_descricao}><h1>{item.nome}</h1> <h2>{item.tipo} . {item.artista}</h2></div> </li>) })}
                        {albums.map((item: ICard) => { return (<li key={item.id} className={styles.card}> <img src={(item.foto==null)?img: item.foto[2].url} alt="" /> <div className={styles.card_descricao}><h1>{item.nome}</h1> <h2>{item.tipo} . {item.artista}</h2></div></li>) })}
                    </ul>
                </div>
                
                

            </div>
        </div>
    )
}

export default Sidebar