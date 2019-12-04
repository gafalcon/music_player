import { Component, OnInit } from '@angular/core';
import { Playlist } from '../models/playlist';
import { ActivatedRoute } from '@angular/router';
// import { Location } from '@angular/common';
import { ApiService } from '../services/api.service';
import { AmplitudeService } from '../services/amplitude.service';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';
import { faPlus, faPlay } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {

    faPlay = faPlay;
    faPlus = faPlus;
    playlist: Playlist;
    currentUser: User;
    constructor(
        private route: ActivatedRoute,
        private auth: AuthService,
        private api: ApiService,
        private amplitude: AmplitudeService
    ) { }

    ngOnInit() {
        this.getPlaylist();
        this.auth.currentUser.subscribe(user => this.currentUser = user);
    }

    getPlaylist() {
        const id = +this.route.snapshot.paramMap.get('id');
        this.api.getPlaylist(id)
            .subscribe(playlist => {
                this.playlist = playlist;
                console.log(playlist);
            } );
    }

    addPlaylistToQueue() {
        this.amplitude.addSongs(this.playlist.songs);
    }

    playPlaylist() {
        this.amplitude.playCollection(this.playlist.songs);
    }

}
