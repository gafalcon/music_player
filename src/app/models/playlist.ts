import { Song } from './song';

export class Playlist {
    constructor(public playlist_name: string,
                public cover_art_url: string,
                public songs: Array<Song> ) {
    }
}
