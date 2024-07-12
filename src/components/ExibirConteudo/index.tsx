import { useEffect, useState} from "react"
import IExibirAlbum from "../../interfaces/IExibirAlbum"
import gato from "../../assets/gato.jpg"

interface props {
    exibirAlbum: IExibirAlbum;
}

const ExibirConteudo = ({ exibirAlbum}: props) => {
    const [imagem, setImagem] = useState(gato)
    useEffect(() => {
        if (exibirAlbum.imagem)
        setImagem(exibirAlbum.imagem)
    }, [exibirAlbum])

    if (exibirAlbum.nome != "") return (
        <div>
            <img src={imagem} alt="" />
            <h1>{exibirAlbum.nome}</h1>
            <ul>
                {exibirAlbum.musicas.map((item) => <li>{item.name}</li>)}
            </ul>
        </div>
    )
}

export default ExibirConteudo