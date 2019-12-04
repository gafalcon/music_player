import { Component, OnInit } from '@angular/core';
import { Album } from '../models/album';
import { AmplitudeService } from '../services/amplitude.service';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    playlists: Array<object> = [];
    albums: Array<Album> = [];
    mostPlayedAlbums: Array<Album> = [];
    mostLikedAlbums: Array<Album> = [];
    recentAlbums: Array<Album> = [];
    recentlyPlayedAlbums: Array<Album> = [];

    constructor(private ampService: AmplitudeService, private apiService: ApiService) { }

    ngOnInit() {
        this.apiService.getPlaylists().subscribe(
            playlists => this.playlists = playlists
        );
        // this.apiService.getAlbums().subscribe(
        //     albums => {
        //         this.albums = albums;
        //     }
        // );
        this.apiService.getMostLikedAlbums().subscribe( albums => this.mostLikedAlbums = albums);
        this.apiService.getMostReproducedAlbums().subscribe(albums => {
            this.mostPlayedAlbums = albums;
            console.log("most reproduced");
            console.log(this.mostPlayedAlbums);
        });
        this.apiService.getRecentlyPlayedAlbums().subscribe(albums => this.recentlyPlayedAlbums = albums);
        this.apiService.getRecentAlbums().subscribe(albums => this.recentAlbums = albums);
    }

    addPlaylistToQueue(id: number) {
        this.apiService.getPlaylist(id).subscribe(
            playlist => this.ampService.addSongs(playlist.songs)
        );
    }

    addAlbumToQueue(a: Album) {
        console.log('Add to queue', a);
        this.apiService.getAlbum(a.id).subscribe(
            album => {
                this.ampService.addSongs(album.songs, album.id);
            }
        );
    }

    playPlaylist(id: number) {
        // TODO
    }

}
