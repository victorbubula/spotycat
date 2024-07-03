export default interface IAlbums {
    album:{
    album_type: string
    artists: Array<object>
    available_markets: Array<string>
    copyrights: Array<object>
    external_ids: object
    external_urls: object
    genres: Array<string>
    href: string
    id: string
    images: Array<object>
    label: string
    name: string
    popularity: number
    release_date: string
    release_date_precision: string
    total_tracks: number
    tracks: object
    type: string
    uri: string
}
}