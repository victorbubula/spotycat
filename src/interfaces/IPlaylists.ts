import { IFoto } from "./IUsuario"

export default interface IPlaylists {
    collaborative: boolean
    description: string
    external_urls: object
    href: string
    id: string
    images: Array<IFoto>
    name: string
    owner: object
    primary_color: null | string
    public: boolean
    snapshot_id: string 
    tracks:object
    type: string
    uri: string 
}
