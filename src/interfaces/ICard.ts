import { IFoto } from "./IUsuario"

export default interface ICard {
    nome:string 
    foto:Array<IFoto>|null
    tipo:string
    artista:Array<object>
    id:string
}