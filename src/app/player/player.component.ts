import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

    playlistOpened = false;
    constructor() { }

    ngOnInit() {
    }
    togglePlaylist() {
        console.log('Showing playlist');

        this.playlistOpened = !this.playlistOpened;
    }

}
