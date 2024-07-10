export default interface IPage {
    images: Array<object>
    name: string
    tracks: Array<musica>
    type: string
}

interface musica{
name: string
preview_url: string
}
