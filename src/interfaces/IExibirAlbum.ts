

export default interface IExibirAlbum{
    imagem: string
    nome: string
    artista: string
    musicas: Array<musicas>
    tipo: string
}
export interface musicas {


    name: string
    preview_url: string


}