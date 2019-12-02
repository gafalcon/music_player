import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

    @Input() enablePost = true;
    @Output() postComment = new EventEmitter<string>();
    newComment: string;


    @Input() comments = [];

    constructor() { }

    ngOnInit() {
    }

    addComment() {
        if (this.newComment) {
            this.postComment.emit(this.newComment);
            this.newComment = '';
        }
    }

}
