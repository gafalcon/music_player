import { Component, OnInit } from '@angular/core';
import { Playlist } from '../models/playlist';
import { ActivatedRoute } from '@angular/router';
// import { Location } from '@angular/common';
import { ApiService } from '../services/api.service';
import { AmplitudeService } from '../services/amplitude.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {

    playlist = new Playlist('Playlist_name', 'art', null);
    constructor(
        private route: ActivatedRoute,
        // private location: Location,
        private api: ApiService,
        private amplitude: AmplitudeService
    ) { }

    ngOnInit() {
        this.getPlaylist();
    }

    getPlaylist() {
        const id = +this.route.snapshot.paramMap.get('id');
        this.api.getPlaylist(id)
            .subscribe(playlist => {
                this.playlist = playlist;
            } );
    }

    addPlaylistToQueue() {
        this.amplitude.addSongs(this.playlist.songs);
    }

}
