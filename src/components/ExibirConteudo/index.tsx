import IExibirAlbum from "../../interfaces/IExibirAlbum"
import styles from './ExibirConteudo.module.scss'

interface props {
    exibirAlbum: IExibirAlbum;
}

const ExibirConteudo = ({ exibirAlbum}: props) => {
    if (exibirAlbum.nome != "") return (
        <div className={styles.album}>
            <img src={exibirAlbum.imagem} alt="capa" className={styles.album_capa} />
            <h1 className={styles.album_titulo}>{exibirAlbum.nome}</h1>
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