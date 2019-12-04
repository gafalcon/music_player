import { Component, OnInit, Input } from '@angular/core';
import { Playlist } from '../models/playlist';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';
import { Song } from '../models/song';
import { NotificationsService } from 'angular2-notifications';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-playlists-modal',
  templateUrl: './playlists-modal.component.html',
  styleUrls: ['./playlists-modal.component.css']
})
export class PlaylistsModalComponent implements OnInit {

    playlists: Array<Playlist>;
    currentUser: User;
    newPlaylist: string;
    @Input() songToAdd: Song;

    constructor(
        private api: ApiService,
        private auth: AuthService,
        public activeModal: NgbActiveModal,
        private notifier: NotificationsService
    ) { }

    ngOnInit() {
        this.auth.currentUser.subscribe((user) => {
            console.log(user);
            this.currentUser = user;
            this.api.getPlaylistsByUser(user.id).subscribe((playlists) => {
                this.playlists = playlists;
                console.log(this.playlists);
            });
        });
    }

    addToNewPlaylist() {
        this.api.newPlaylist(this.newPlaylist, this.songToAdd.id).subscribe((playlist: Playlist) => {
            console.log(playlist);
            this.newPlaylist = '';
            this.playlists.unshift(playlist);
            this.notifier.success(`Song added to new playlist ${this.newPlaylist}!`);
        });
    }

    addToPlaylist(playlist: Playlist ) {
        this.api.addSongToPlaylist(playlist.id, this.songToAdd.id).subscribe((res) => {
            console.log(res);
            this.notifier.success(`Song added to playlist ${playlist.name}`);
        });
    }

}
