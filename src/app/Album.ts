import { Song } from './song';

export class Album {
    constructor(
        public id: number,
        public name: string,
        public artist: string,
        public releaseDate: string,
        public coverArt: string,
        public songs: Array<Song>
    ) {
    }

}
