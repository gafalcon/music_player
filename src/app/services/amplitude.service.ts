import { Injectable } from '@angular/core';
import * as Amplitude from 'amplitudejs';
import { ApiService } from './api.service';
import { Song } from '../models/song';
import { NotificationsService } from 'angular2-notifications';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AmplitudeService {

    private apiURL = `${environment.apiUrl}/api`;

    constructor(
        private api: ApiService,
        private notifier: NotificationsService,
        private http: HttpClient
    ) { }

    currentSongs: Array<Song>;
    startAmplitude() {
        this.api.getCurrentPlaylist().subscribe(
            songs => {
                this.currentSongs = songs;
                Amplitude.init({
                    songs: this.currentSongs,
                    default_album_art: 'http://cdn.last.fm/flatness/responsive/2/noimage/default_album_300_g4.png',
                    callbacks: {
                        song_change: () => {
                            this.notifier.success('Playing: ' + Amplitude.getActiveSongMetadata().name);
                        },
                        ended: () => {
                            console.log('Ended' + Amplitude.getActiveSongMetadata().name);
                            this.postSongReproduced(Amplitude.getActiveSongMetadata().id);
                        }
                    }
                });
            }
        );
    }

    postSongReproduced(songId: number) {
        this.http.post(`${this.apiURL}/songs/${songId}/repr`, null).subscribe(res => console.log(res));
    }

    postAlbumReproduced(albumId: number) {
        this.http.post(`${this.apiURL}/albums/${albumId}/repr`, null).subscribe(res => console.log(res));
    }

    addSong(song: Song) {
        Amplitude.addSong(song);
        // this.currentSongs.push(song);
        Amplitude.bindNewElements();
        this.notifier.success(song.name + ' added to Queue');
    }

    addSongs(songs: Array<Song>, albumId?: number) {
        this.currentSongs.push(...songs);
        Amplitude.bindNewElements();
        this.notifier.success('Songs added to Queue');
        if (albumId) {
            this.postAlbumReproduced(albumId);
        }
    }

    playNow(song: Song) {
        Amplitude.playNow(song);
        Amplitude.bindNewElements();
    }

    playSongAtIndex(songIndex: number) {
        Amplitude.playSongAtIndex( songIndex );
    }

    removeSong(songIndex: number) {
        Amplitude.removeSong(songIndex);
        Amplitude.bindNewElements();
    }
}
