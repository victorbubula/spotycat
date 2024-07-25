import IExibirAlbum from "../../interfaces/IExibirAlbum"
import styles from './ExibirConteudo.module.scss'

interface props {
    exibirAlbum: IExibirAlbum;
}

const ExibirConteudo = ({ exibirAlbum}: props) => {
    if (exibirAlbum.nome != "") return (
        <div className={styles.album}>
            <div className={styles.album_head}>
                <img src={exibirAlbum.imagem} alt="capa" className={styles.album_capa} />
                <div className={styles.album_info}>
                    <h2 className={styles.album_tipo}>{exibirAlbum.tipo}</h2>
                    <h1 className={styles.album_titulo}>{exibirAlbum.nome}</h1>
                    <h3 className={styles.album_artista}>{exibirAlbum.artista}</h3>
                    <h4>{exibirAlbum.musicas.length}</h4>
                </div>
                
            </div>
            <table className={styles.album_musicas}>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Título</th>
                        <th>Album</th>
                        <th>Relogio</th>
                    </tr>
                </thead>
                <tbody>
                    {exibirAlbum.musicas.map((item, indice) => 
                        <tr key={indice+1} >
                            <td>{indice + 1}</td>
                            <td>{item.name}</td>
                            <td>albo</td>
                            <td>2:2</td>
                        </tr>
                    )}
                </tbody>
                
            </table>
        </div>
    )
}

export default ExibirConteudo