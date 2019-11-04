import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-likes',
  templateUrl: './likes.component.html',
  styleUrls: ['./likes.component.css']
})
export class LikesComponent implements OnInit {

    likes = 199;
    dislikes = 10;
    constructor() { }
    liked = false;
    disliked = false;

    ngOnInit() {
    }

    like() {
        if (!this.liked) {
            this.likes +=1;
            this.liked = true;
        }else{
            this.likes -=1;
            this.liked = false;
        }
    }

    dislike() {
        if (!this.disliked) {
            this.dislikes += 1;
            this.disliked = true;
        } else {
            this.dislikes -=1;
            this.disliked = false;
        }

    }
}
