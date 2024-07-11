import { IFoto } from "./IUsuario"

export default interface IExibirAlbum{
    album:{
    images: Array<IFoto>
    name: string
    tracks: musicas
    type: string
    exibir: boolean
    }
}
interface musicas {
    items: [
        {
            name:string
            preview_url:string
        }
    ]
}