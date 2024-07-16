import styles from './Biblioteca.module.scss'
import PesquisaBiblioteca from './PesquisaBiblioteca'
import ICard from '../../../interfaces/ICard'
import { useEffect, useState } from 'react'
import IExibirAlbum from '../../../interfaces/IExibirAlbum'
import { getTracks } from '../../../api/SpotifyApi'

interface Props {
    playlists: Array<ICard>
    albums: Array<ICard>
    exibindoAlbum: React.Dispatch<React.SetStateAction<IExibirAlbum>>
    pesquisar:(value: string)=> void
};

const Biblioteca = ({ playlists, albums, exibindoAlbum, pesquisar }: Props) => {
    const [itemAtivo, setItemAtivo] = useState({ tipo: "", id: "" })

    useEffect(() => {
        if (itemAtivo.id != "") {
            getTracks(itemAtivo.tipo, itemAtivo.id, exibindoAlbum)
        }

    }, [itemAtivo])
    return (
        <div className={styles.biblioteca}>
            <div className={styles.biblioteca_btn}>
                <span className={styles.biblioteca_icone}></span>
                <h1 className={styles.biblioteca_titulo}>Sua Biblioteca</h1>
            </div>
            <div className={styles.biblioteca_lista}>
                <div className={styles.lista_filtros}>
                    <PesquisaBiblioteca pesquisar={pesquisar} />
                    <p>filtro</p>
                </div>
                <ul className={styles.lista_container}>
                    {[albums, playlists].map((item: Array<ICard>) => item.map((item: ICard) => {
                        return (
                            <li key={item.id} className={styles.lista_card} onClick={() => setItemAtivo({ tipo: item.tipo, id: item.id })}>
                                <img src={item.foto} alt="" />
                                <div className={styles.card_descricao}>
                                    <h1>{item.nome}</h1>
                                    <h2>{item.tipo} . {item.artista}</h2>
                                </div>
                            </li>
                        )
                    }))}
                </ul>
            </div>
        </div>
    )
}

export default Biblioteca