import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Song } from './song';
import { Playlist } from './playlist'
import * as data from '../music/playlists.json'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

    private api_url = "http://localhost:8080/";
    songs: Array<Song> = [
        {
            name: 'Risin\' High (feat Raashan Ahmad)',
            artist: 'Ancient Astronauts',
            album: 'We Are to Answer',
            url: 'https://521dimensions.com/song/Ancient Astronauts - Risin\' High (feat Raashan Ahmad).mp3',
            cover_art_url: 'https://521dimensions.com/img/open-source/amplitudejs/album-art/we-are-to-answer.jpg'
        },
        {
            name: 'The Gun',
            artist: 'Lorn',
            album: 'Ask The Dust',
            url: 'https://521dimensions.com/song/08 The Gun.mp3',
            cover_art_url: 'https://521dimensions.com/img/open-source/amplitudejs/album-art/ask-the-dust.jpg'
        },
        {
            name: 'Anvil',
            artist: 'Lorn',
            album: 'Anvil',
            url: 'https://521dimensions.com/song/LORN - ANVIL.mp3',
            cover_art_url: 'https://521dimensions.com/img/open-source/amplitudejs/album-art/anvil.jpg'
        },
        {
            name: 'I Came Running',
            artist: 'Ancient Astronauts',
            album: 'We Are to Answer',
            url: 'https://521dimensions.com/song/ICameRunning-AncientAstronauts.mp3',
            cover_art_url: 'https://521dimensions.com/img/open-source/amplitudejs/album-art/we-are-to-answer.jpg'
        },
        {
            name: 'First Snow',
            artist: 'Emancipator',
            album: 'Soon It Will Be Cold Enough',
            url: 'https://521dimensions.com/song/FirstSnow-Emancipator.mp3',
            cover_art_url: 'https://521dimensions.com/img/open-source/amplitudejs/album-art/soon-it-will-be-cold-enough.jpg'
        }
    ];
    constructor(private http: HttpClient) { }

    getCurrentPlaylist(): Observable<Array<Song>> {
        return of(this.songs);
    }

    getPlaylists2(): Observable<Array<object>> {
        this.http.get<Array<object>>(this.api_url + 'playlists').subscribe(
            playlists => {
                console.log("Fetched from api server");
                console.log(playlists);
            }
        );
        return of(data.playlists);
    }

    getPlaylists(): Observable<Array<object>> {
        return this.http.get<Array<object>>(this.api_url + 'playlists');
    }

    getAlbums(userId: number): Observable<Array<object>> {
        return of(data.albums);
    }

    getPlaylist(id): Observable<Playlist> {
        return this.http.get<Playlist>(this.api_url + 'playlists/' + id);
        // return of(data.full_playlists[id]);
    }

    newSong(data) {
        return this.http.post<any>(this.api_url + "songs", data);
    }

    uploadSong(data) {
        return this.http.post(this.api_url + "songs/upload", data);
    }

}
