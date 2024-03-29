import { Component, OnInit } from '@angular/core';
import { Album } from '../models/album';
import { AmplitudeService } from '../services/amplitude.service';
import { ApiService } from '../services/api.service';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';

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
    currentUser: User;

    constructor(private ampService: AmplitudeService,
                private apiService: ApiService,
                private auth: AuthService
               ) { }

    ngOnInit() {
        this.apiService.getPlaylists().subscribe(
            playlists => this.playlists = playlists
        );
        this.apiService.getMostLikedAlbums().subscribe( albums => this.mostLikedAlbums = albums);
        this.apiService.getMostReproducedAlbums().subscribe(albums => {
            this.mostPlayedAlbums = albums;
        });

        this.apiService.getRecentAlbums().subscribe(albums => this.recentAlbums = albums);
        this.auth.currentUser.subscribe(user => {
            this.currentUser = user;
            if (user) {
                this.apiService.getRecentlyPlayedAlbums().subscribe(albums => {
                    this.recentlyPlayedAlbums = albums;
                });
            }
        });
    }

    addPlaylistToQueue(id: number) {
        this.apiService.getPlaylist(id).subscribe(
            playlist => this.ampService.addSongs(playlist.songs)
        );
    }

    addAlbumToQueue(a: Album) {
        this.apiService.getAlbum(a.id).subscribe(
            album => {
                this.ampService.addSongs(album.songs, album.id);
            }
        );
    }

    playPlaylist(id: number) {
        // TODO
    }

    addToPlaylist(album: Album) {
        // TODO
    }

    playAlbum(album: Album) {
        this.ampService.playCollection(album.songs, album.id);
    }
}
