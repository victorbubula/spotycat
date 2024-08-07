import { useEffect, useRef, useState } from "react";
import IExibirAlbum from "../../interfaces/IExibirAlbum"
import styles from './ExibirConteudo.module.scss'
import { getColor } from "color-thief-react";

interface props {
    exibirAlbum: IExibirAlbum;
}

const ExibirConteudo = ({ exibirAlbum}: props) => {
    const [cor, setcor] = useState('')
    const inputRef = useRef<HTMLImageElement>(null)
    const pegaCor =async () => {
        const colorThief = getColor(exibirAlbum.imagem, 'hex', "Anonymous")
        setcor(await colorThief)
    }
    
    useEffect(()=> {
    
            if (inputRef.current?.complete) {
                pegaCor()
            }
            
    }, [exibirAlbum.imagem])
    

    if (exibirAlbum.nome != "") return (
        <div className={styles.album}>
            <div className={styles.album_head} style={{backgroundColor:cor}}>
                <img ref={inputRef} src={exibirAlbum.imagem} alt="capa" className={styles.album_capa} />
                <div className={styles.album_info}>
                    <h2 className={styles.album_tipo}>{exibirAlbum.tipo}</h2>
                    <h1 className={styles.album_titulo}>{exibirAlbum.nome}</h1>
                    <div>
                        <h3 className={styles.album_artista}>{exibirAlbum.artista}</h3>
                        <p className={styles.album_tamanho}>{exibirAlbum.musicas.length}</p>
                    </div>
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