import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-list-collection',
  templateUrl: './list-collection.component.html',
  styleUrls: ['./list-collection.component.css']
})
export class ListCollectionComponent implements OnInit {

    faTimes = faTimes;
    @Input() collection: any;
    @Input() link: string;
    @Input() deleteEnabled = false;
    @Output() public onDelete = new EventEmitter<number>();
    constructor() { }

    ngOnInit() {
    }

}
