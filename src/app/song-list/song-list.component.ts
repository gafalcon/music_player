import { Component, OnInit, Input } from '@angular/core';
import { Song } from '../song';
import { AmplitudeService } from '../amplitude.service';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.css']
})
export class SongListComponent implements OnInit {

    @Input() songs: Array<Song>;

    constructor(private amplitude: AmplitudeService) {
    }

    ngOnInit() {
    }

    addSongToQueue(song: Song) {
        this.amplitude.addSong(song);
    }

    playSong(song: Song) {
        this.amplitude.playNow(song);
    }
}
