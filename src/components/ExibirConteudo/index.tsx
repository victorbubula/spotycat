
import gato from "../../assets/gato.jpg"
import { useEffect, useState } from "react"
import IExibirPlaylist from "../../interfaces/IExibirPlaylist"
import IExibirAlbum from "../../interfaces/IExibirAlbum"

interface props {
    exibirAlbum: IExibirAlbum
    exibirPlaylist: IExibirPlaylist
}

const ExibirConteudo = ({ exibirAlbum, exibirPlaylist }: props) => {
    const [imagem, setImagem] = useState(gato);
    const exibindo = (exibirAlbum.album.type == "album") ? exibirAlbum.album : exibirPlaylist
    let nome = ""
    useEffect(() => {
        if (exibindo == exibirAlbum.album) {
            if (exibindo.images)
                setImagem(exibindo.images[0].url)
            nome = exibindo.name
        } else if (exibindo == exibirPlaylist) {
            if (exibindo.images) {
                setImagem(exibindo.images[0].url)
            }
            nome = exibindo.name
        }


        //ARRUMAR ESSA PORRA PRA APARECER NA TELA DIREITO
    }, [exibirAlbum, exibirPlaylist])

    if (nome!="") return (
        <div>
            <img src={imagem} alt="" />
            <h1>{nome}</h1>
            <ul>

            </ul>
        </div>

    )
}

export default ExibirConteudo