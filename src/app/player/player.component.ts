import { Component, OnInit } from '@angular/core';
import { AmplitudeService } from '../amplitude.service';
import { Song } from '../song';
@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

    playlistOpened = false;
    songs: Array<object>;
    constructor(private ampService: AmplitudeService) { }

    ngOnInit() {
        this.ampService.startAmplitude();
    }
    togglePlaylist() {
        this.playlistOpened = !this.playlistOpened;
    }

    addSong(song: Song) {
        this.ampService.addSong(song);
    }

    playSongAtIndex(i: number) {
        this.ampService.playSongAtIndex(i);
    }

    removeSong(event: Event, songId: number) {
        event.stopPropagation();
        this.ampService.removeSong(songId);
    }
}
