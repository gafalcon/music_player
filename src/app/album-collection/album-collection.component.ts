import { Component, OnInit } from '@angular/core';
import { AmplitudeService } from '../services/amplitude.service';
import { ApiService } from '../services/api.service';
import { Album } from '../models/album';

@Component({
  selector: 'app-album-collection',
  templateUrl: './album-collection.component.html',
  styleUrls: ['./album-collection.component.css']
})
export class AlbumCollectionComponent implements OnInit {

    playlists: Array<object>;
    albums: Array<Album>;
    constructor(private ampService: AmplitudeService, private apiService: ApiService) { }

    ngOnInit() {
        this.apiService.getPlaylists().subscribe(
            playlists => this.playlists = playlists
        );
        this.apiService.getAlbums(0).subscribe(
            albums => {
                this.albums = albums;
            }
        );
    }

    addPlaylistToQueue(id: number) {
        this.apiService.getPlaylist(id).subscribe(
            playlist => this.ampService.addSongs(playlist.songs)
        );
    }

    addAlbumToQueue(id: number) {
        this.apiService.getAlbum(id).subscribe(
            album => {
                this.ampService.addSongs(album.songs);
            }
        );
    }

    playPlaylist(id: number) {
        // TODO
    }

}
