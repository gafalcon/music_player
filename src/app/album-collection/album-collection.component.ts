import { Component, OnInit } from '@angular/core';
import { AmplitudeService } from '../amplitude.service';
import { ApiService } from '../api.service';
import { Playlist } from '../playlist';

@Component({
  selector: 'app-album-collection',
  templateUrl: './album-collection.component.html',
  styleUrls: ['./album-collection.component.css']
})
export class AlbumCollectionComponent implements OnInit {

    playlists: Array<object>;
    constructor(private ampService: AmplitudeService, private apiService: ApiService) { }

    ngOnInit() {
        this.apiService.getPlaylists().subscribe(
            playlists => this.playlists = playlists
        );
    }

    addPlaylistToQueue(id: number) {
        this.apiService.getPlaylist(id).subscribe(
            playlist => this.ampService.addSongs(playlist.songs)
        );
    }

    playPlaylist(id: number) {
        // TODO
    }

}
