import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

    currentUser: User;
    comments = [
        {img: 'https://bootdey.com/img/Content/user_1.jpg', username: '@MartinoMont', comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', date: '30 min ago' },
        {img: 'https://bootdey.com/img/Content/user_2.jpg', username: '@LaurenceCorreil', comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', date: '30 min ago' },
        {img: 'https://bootdey.com/img/Content/user_3.jpg', username: '@JohnNida', comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', date: '30 min ago' },
    ];

    newComment: string;
    constructor(
        private auth: AuthService
    ) {
        this.auth.currentUser.subscribe(user => this.currentUser = user);
    }

    ngOnInit() {
    }

    addComment() {
        if (this.newComment) {
            console.log("add comment");
            console.log(this.newComment);

            let c = {'img': 'https://bootdey.com/img/Content/user_3.jpg', username: this.currentUser.username, comment: this.newComment, date: 'now'};
            this.comments.unshift(c);
            this.newComment = '';
        }
    }

}
