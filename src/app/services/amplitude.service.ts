import { Injectable } from '@angular/core';
import * as Amplitude from 'amplitudejs';
import { ApiService } from './api.service';
import { Song } from '../models/song';
import { NotificationsService } from 'angular2-notifications';

@Injectable({
  providedIn: 'root'
})
export class AmplitudeService {

    constructor(
        private api: ApiService,
        private notifier: NotificationsService
    ) { }

    songsToAdd = [
  {
    'name': 'Terrain',
    'artist': 'pg.lost',
    'album': 'Key',
    'url': 'https://521dimensions.com/song/Terrain-pglost.mp3',
    'cover_art_url': 'https://521dimensions.com/img/open-source/amplitudejs/album-art/key.jpg'
  },
  {
    'name': 'Vorel',
    'artist': 'Russian Circles',
    'album': 'Guidance',
    'url': 'https://521dimensions.com/song/Vorel-RussianCircles.mp3',
    'cover_art_url': 'https://521dimensions.com/img/open-source/amplitudejs/album-art/guidance.jpg'
  },
  {
    'name': 'Intro / Sweet Glory',
    'artist': 'Jimkata',
    'album': 'Die Digital',
    'url': 'https://521dimensions.com/song/IntroSweetGlory-Jimkata.mp3',
    'cover_art_url': 'https://521dimensions.com/img/open-source/amplitudejs/album-art/die-digital.jpg'
  },
  {
    'name': 'Offcut #6',
    'artist': 'Little People',
    'album': 'We Are But Hunks of Wood Remixes',
    'url': 'https://521dimensions.com/song/Offcut6-LittlePeople.mp3',
    'cover_art_url': 'https://521dimensions.com/img/open-source/amplitudejs/album-art/we-are-but-hunks-of-wood.jpg'
  },
  {
    'name': 'Dusk To Dawn',
    'artist': 'Emancipator',
    'album': 'Dusk To Dawn',
    'url': 'https://521dimensions.com/song/DuskToDawn-Emancipator.mp3',
    'cover_art_url': 'https://521dimensions.com/img/open-source/amplitudejs/album-art/from-dusk-to-dawn.jpg'
  },
  {
    'name': 'Anthem',
    'artist': 'Emancipator',
    'album': 'Soon It Will Be Cold Enough',
    'url': 'https://521dimensions.com/song/Anthem-Emancipator.mp3',
    'cover_art_url': 'https://521dimensions.com/img/open-source/amplitudejs/album-art/soon-it-will-be-cold-enough.jpg'
  }
];
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
                        }
                    }
                });
            }
        );
    }

    addSong(song: Song) {
        Amplitude.addSong(song);
        // this.currentSongs.push(song);
        Amplitude.bindNewElements();
        this.notifier.success(song.name + ' added to Queue');
    }

    addSongs(songs: Array<Song>) {
        this.currentSongs.push(...songs);
        Amplitude.bindNewElements();
        this.notifier.success('Songs added to Queue');
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
