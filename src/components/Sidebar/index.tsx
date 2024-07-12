import ICard from "../../interfaces/ICard";
import styles from "./Sidebar.module.scss";
import img from '../../assets/gato.jpg';
import PesquisaBiblioteca from "./PesquisaBiblioteca";
import { getTracks } from "../../api/SpotifyApi";
import { useEffect, useState } from "react";
import IExibirAlbum from "../../interfaces/IExibirAlbum";
interface props {
    playlists: Array<ICard>
    albums: Array<ICard>
    exibindoAlbum: React.Dispatch<React.SetStateAction<IExibirAlbum>>
}

const Sidebar = ({ playlists, albums, exibindoAlbum}: props) => {
    const [itemAtivo, setItemAtivo] = useState({tipo:"",id:""})
    useEffect(()=> {
        if(itemAtivo.id !=""){
            getTracks(itemAtivo.tipo, itemAtivo.id, exibindoAlbum)
        }
            
    }, [itemAtivo])
    return (
        <div className={styles.container}>
            <div className={styles.inicio}>
                <span className={styles.inicio_icone}></span>
                <h1 className={styles.inicio_titulo}>Início</h1>
            </div>
            <div className={styles.biblioteca}>
                <div className={styles.biblioteca_btn}>
                    <span className={styles.biblioteca_icone}></span>
                    <h1 className={styles.biblioteca_titulo}>Sua Biblioteca</h1>
                </div>
                <div className={styles.biblioteca_lista}>
                    <div className={styles.lista_filtros}>
                        <PesquisaBiblioteca/>
                        <p>filtro</p>
                    </div>
                    <ul className={styles.lista_container}>
                        {playlists.map((item: ICard) => {
                            return (
                                <li key={item.id} className={styles.lista_card} onClick={()=>setItemAtivo({tipo:item.tipo, id:item.id})}>
                                    <img src={(item.foto == null) ? img : item.foto[0].url} alt="" />
                                    <div className={styles.card_descricao}>
                                        <h1>{item.nome}</h1>
                                        <h2>{item.tipo} . {item.artista}</h2>
                                    </div>
                                </li>
                            )
                        })}
                        {albums.map((item: ICard) => {
                            return (
                                <li key={item.id} className={styles.lista_card} onClick={()=>setItemAtivo({tipo:item.tipo, id:item.id})}>
                                    <img src={(item.foto == null) ? img : item.foto[2].url} alt="" />
                                    <div className={styles.card_descricao}>
                                        <h1>{item.nome}</h1>
                                        <h2>{item.tipo} . {item.artista}</h2>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Sidebar