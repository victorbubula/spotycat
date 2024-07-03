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

                {playlists.map((item: ICard) => { return (<div key={item.id} className={styles.card}> <img src={(item.foto==null)?img: item.foto[0].url} alt="" />  {item.nome} <br></br> </div>) })}
                {albums.map((item: ICard) => { return (<div key={item.id} className={styles.card}> <img src={(item.foto==null)?img: item.foto[2].url} alt="" /> {item.nome} <br></br> </div>) })}

            </div>
        </div>
    )
}

export default Sidebar