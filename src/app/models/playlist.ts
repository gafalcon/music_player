import { Song } from './song';

export class Playlist {
    constructor(
        public id: number,
        public name: string,
        public coverArtUrl: string,
        public songs: Array<Song> ) {
    }
}
