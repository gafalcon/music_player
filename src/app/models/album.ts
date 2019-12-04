import { Song } from './song';

export class Album {
    public totalLikes = 0;
    public totalDislikes = 0;
    public totalReproductions = 0;
    public createdBy: number;
    constructor(
        public id: number,
        public name: string,
        public artist: string,
        public releaseDate: string,
        public cover_art_url: string,
        public songs: Array<Song>,
        public genres: string
    ) {
    }

}
