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
  responsiveOptions = [];
    dots = 'carousel-dots';
    faPlay = faPlay;
  constructor() {
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 4,
        numScroll: 4
      },
      {
        breakpoint: '768px',
        numVisible: 3,
        numScroll: 3
      },
      {
        breakpoint: '640px',
        numVisible: 2,
        numScroll: 2
      }
    ];

  }

    ngOnInit() {
    }

  get uniqueElems(){
    const unique_ids = new Set();
    const uniqueElems = [];
    for(let item of this.collection) {
      if (!unique_ids.has(item.id)){
        unique_ids.add(item.id);
        uniqueElems.push(item);
      }
    }

    return uniqueElems;
  }
}
