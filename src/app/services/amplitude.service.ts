import { Injectable } from '@angular/core';
import * as Amplitude from 'amplitudejs';
import { Song } from '../models/song';
import { NotificationsService } from 'angular2-notifications';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AmplitudeService {

    private apiURL = `${environment.apiUrl}/api`;
    currentUser: User;
    constructor(
        private notifier: NotificationsService,
        private http: HttpClient,
        private auth: AuthService
    ) {
       this.currentSongs = this.recoverPlayQueue();
    }

    currentSongs: Array<Song> = [];
    startAmplitude() {
      document['Amplitude'] = Amplitude;
        this.auth.currentUser.subscribe(user => { this.currentUser = user; });
        Amplitude.init({
            songs: [...this.currentSongs],
            default_album_art: 'http://cdn.last.fm/flatness/responsive/2/noimage/default_album_300_g4.png',
            callbacks: {
                song_change: () => {
                    if (Amplitude.getPlayerState() === 'playing')
                        this.notifier.success('Playing: ' + Amplitude.getActiveSongMetadata().name);
                },
                ended: () => {
                    // console.log('Ended' + Amplitude.getActiveSongMetadata().name);
                    this.postSongReproduced(Amplitude.getActiveSongMetadata().id);
                }
            }
        });
    }

    postSongReproduced(songId: number) {
        if (this.currentUser)
            this.http.post(`${this.apiURL}/songs/${songId}/repr`, null).subscribe(res => console.log(res));
    }

    postAlbumReproduced(albumId: number) {
        if (this.currentUser)
            this.http.post(`${this.apiURL}/albums/${albumId}/repr`, null).subscribe(res => console.log(res));
    }

    addSong(song: Song) {
        Amplitude.addSong(song);
        this.currentSongs.push(song);
        Amplitude.bindNewElements();
        this.notifier.success(song.name + ' added to Queue');
        this.savePlayQueue();
    }

    addSongs(songs: Array<Song>, albumId?: number) {
        this.currentSongs.push(...songs);
      for(let song of songs) {
        Amplitude.addSong(song);
      }
        Amplitude.bindNewElements();
        this.notifier.success('Songs added to Queue');
        if (albumId) {
            this.postAlbumReproduced(albumId);
        }
        this.savePlayQueue();
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
      this.currentSongs.splice(songIndex, 1);
    }

    playCollection(collection: Array<Song>, albumId?: number) {
        Amplitude.pause();
        const length = Amplitude.getSongs().length;
        for (let i  = 0; i < length; ++i) {
            Amplitude.removeSong(0);
            Amplitude.bindNewElements();
        }
      this.currentSongs = [];
        this.addSongs(collection, albumId);

        Amplitude.next();
        this.playSongAtIndex(0);
    }

    savePlayQueue() {
        localStorage.setItem('playQueue', JSON.stringify(this.currentSongs));
    }

    recoverPlayQueue() {
        const playQueue = JSON.parse(localStorage.getItem('playQueue'));
        return playQueue ? playQueue : [];
    }
}
