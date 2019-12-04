import { Component, OnInit, Input } from '@angular/core';
import { Song } from '../models/song';
import { AmplitudeService } from '../services/amplitude.service';
import { ApiService } from '../services/api.service';
import { NotificationsService } from 'angular2-notifications';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PlaylistsModalComponent } from '../playlists-modal/playlists-modal.component';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.css']
})
export class SongListComponent implements OnInit {

    faHeart = faHeart;
    @Input() songs: Array<Song>;
    @Input() isLoggedIn = false;

    constructor(
        private amplitude: AmplitudeService,
        private api: ApiService,
        private notifier: NotificationsService,
        private modalService: NgbModal
    ) {
    }

    ngOnInit() {
    }

    addSongToQueue(song: Song) {
        this.amplitude.addSong(song);
    }

    playSong(song: Song) {
        this.amplitude.playNow(song);
    }

    likeSong(song: Song) {
        this.api.postLike(song.id, 'songs', 'like').subscribe((res) => this.notifier.success('Added to liked songs'));
    }

    addToPlaylist(song: Song) {
        const modalRef = this.modalService.open(PlaylistsModalComponent);
        modalRef.componentInstance.songToAdd = song;
    }
}
