import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-album-collection',
  templateUrl: './album-collection.component.html',
  styleUrls: ['./album-collection.component.css']
})
export class AlbumCollectionComponent implements OnInit {

    @Input() collection = [];
    @Input() title = 'Collection';
    @Input() collectionType = 'album';
    @Output() addToQueue = new EventEmitter<any>();
    @Output() addToPlaylist = new EventEmitter<any>();
    @Output() playCollection = new EventEmitter<any>();

    dots = 'carousel-dots';
    faPlay = faPlay;
    constructor() {}

    ngOnInit() {
    }

}
