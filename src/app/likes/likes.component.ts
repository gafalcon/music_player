import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-likes',
  templateUrl: './likes.component.html',
  styleUrls: ['./likes.component.css']
})
export class LikesComponent implements OnInit {

    @Input() model: any;
    @Input() modelType: any;
    @Output() likeEvent = new EventEmitter<string>();
    @Input() liked = false;
    @Input() disliked = false;
    @Input() enabled = false;

    constructor(private api: ApiService) { }

    ngOnInit() {

    }

    likeClick() {
        if (!this.enabled) {
            return;
        }
        if (!this.liked) {
            this.api.postLike(this.model.id, this.modelType, 'like').subscribe((res: any) => {
                console.log(res);
                if (res.success) {
                    this.model.totalLikes += 1;
                    this.likeEvent.emit('liked');

                  this.liked = !this.liked;
                  this.disliked = false;
                }
            }, (err) => {console.log('ERROR'); console.log(err); });
        } else {
            this.api.deleteLike(this.model.id, this.modelType, 'like').subscribe((res: any) => {
                console.log(res);
                if (res.success) {
                    this.model.totalLikes -= 1;
                    this.likeEvent.emit('unliked');
                }
                this.liked = !this.liked;
            });
        }
    }

    dislikeClick() {
        if (!this.enabled) {
            return;
        }
        if (!this.disliked) {
            this.model.totalDislikes += 1;
            this.api.postLike(this.model.id, this.modelType, 'dislike').subscribe((res: any) => {
                console.log(res);
                if (res.success) {
                    this.likeEvent.emit('disliked');
                    this.disliked = !this.disliked;
                    this.liked = false;
                }
            });
        } else {
            this.model.totalDislikes -= 1;
            this.api.deleteLike(this.model.id, this.modelType, 'dislike').subscribe((res: any) => {
                console.log(res);
                if (res.success) {
                    this.likeEvent.emit('undisliked');
                    this.disliked = !this.disliked;
                }
            });
        }
    }
}
