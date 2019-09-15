
import { Component, OnInit, Input } from '@angular/core';
import { Playlist } from '../playlist';
import { ActivatedRoute } from '@angular/router';
// import { Location } from '@angular/common';
import { ApiService } from '../api.service';
import { Song } from '../song';
import { AmplitudeService } from '../amplitude.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {

    playlist: Playlist;
    constructor(
        private route: ActivatedRoute,
        // private location: Location,
        private api: ApiService,
        private amplitude: AmplitudeService
    ) { }

    ngOnInit() {
        this.getAlbum();
    }

    getAlbum() {
        const id = +this.route.snapshot.paramMap.get('id');
        console.log(id);
        this.api.getPlaylist(id)
            .subscribe(playlist => {
                this.playlist = playlist;
                console.log(this.playlist);
            } );
    }

    addPlaylistToQueue(playlist: Playlist) {
        this.amplitude.addSongs(this.playlist.songs);
    }

    addSongToQueue(song: Song) {
        this.amplitude.addSong(song);
    }

    playSong(song: Song) {
        this.amplitude.playNow(song);
    }

}
