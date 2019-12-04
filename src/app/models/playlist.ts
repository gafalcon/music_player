import { Song } from './song';

export class Playlist {
    constructor(
        public id: number,
        public name: string,
        public cover_art_url: string,
        public songs: Array<Song>,
        public createdBy?: number
    ) {
    }
}
