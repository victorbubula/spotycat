import { IFoto } from "./IUsuario"

export default interface IExibirPlaylist {
    images: Array<IFoto>
    name: string
    tracks:musicas
    type: string
    exibir:boolean
}

interface musicas{
    items: [{
        track:{
            name: string
            preview_url: string
        }
        
    }]
    }