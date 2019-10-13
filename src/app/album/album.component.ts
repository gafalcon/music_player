
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { Location } from '@angular/common';
import { ApiService } from '../services/api.service';
import { AmplitudeService } from '../services/amplitude.service';
import { Album } from '../models/album';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {

    album = new Album(1, '', '', '', '', []);
    constructor(
        private route: ActivatedRoute,
        // private location: Location,
        private api: ApiService,
        private amplitude: AmplitudeService
    ) { }

    ngOnInit() {
        this.getAlbum();
    }

    getAlbum() {
        const id = +this.route.snapshot.paramMap.get('id');
        this.api.getAlbum(id)
            .subscribe(album => {
                this.album = album;
            } );
    }

    addPlaylistToQueue() {
        this.amplitude.addSongs(this.album.songs);
    }

}
