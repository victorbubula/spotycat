export default interface IAlbums {
    album_group: string
    album_type: string
    artists: Array<object>
    external_urls: object
    href: string
    id: string
    images: Array<object>
    is_playable: boolean
    name: string
    release_date: string
    release_date_precision: string
    total_tracks: number
    type: string
    uri: string 
}