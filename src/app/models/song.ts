
export class Song {

    public totalLikes = 0;
    public totalDislikes = 0;
    public totalReproductions = 0;

    constructor(
        public id: number,
        public name: string,
        public artist: string,
        public album: string,
        public url: string,
        public cover_art_url: string,
        public genres?: string,
        public lyrics?: string,
        public albumId?: string
    ) {

    }
}
