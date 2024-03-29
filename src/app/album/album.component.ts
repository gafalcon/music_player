
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { Location } from '@angular/common';
import { ApiService } from '../services/api.service';
import { AmplitudeService } from '../services/amplitude.service';
import { Album } from '../models/album';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';
import { NotificationsService } from 'angular2-notifications';
import { faPlus, faPlay } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {

    faPlay = faPlay;
    faPlus = faPlus;
    album = new Album(1, '', '', '', '', [], '');
    comments = [];
    currentUser: User;
    liked = false;
    disliked = false;
    enableLikes = false;

    constructor(
        private route: ActivatedRoute,
        private notifier: NotificationsService,
        private api: ApiService,
        private amplitude: AmplitudeService,
        private auth: AuthService
    ) { }

    ngOnInit() {
        const id = +this.route.snapshot.paramMap.get('id');
        this.getData(id);
        this.auth.currentUser.subscribe((user) => {
            this.currentUser = user;

            if(this.currentUser) {
                this.enableLikes = true;
                this.api.isLikedDisliked(id, 'albums').subscribe((res: any) => {
                    if (res.success) {
                        if (res.message === 'liked') {
                            this.liked = true;
                        } else {
                            this.disliked = true;
                        }
                    }
                });
            }
        });
    }

    getData(id: number) {
        this.api.getAlbum(id)
            .subscribe(album => {
                this.album = album;
            } );

        this.api.getAlbumComments(id).subscribe((comments) => {
            this.comments = comments;
        });

    }


    addPlaylistToQueue() {
        this.amplitude.addSongs(this.album.songs, this.album.id);
    }

    createComment(comment: string) {
        this.api.postAlbumComment(this.album.id, {comment}).subscribe((newComment) => {
            newComment.username = this.currentUser.username;
            this.comments.unshift(newComment);
            this.notifier.success('New comment posted!');
        });
    }

    likeEvent(event: string) {
        this.notifier.success(event);
    }


    playAlbum() {
        this.album.totalReproductions += 1;
        this.amplitude.playCollection(this.album.songs, this.album.id);
    }
}
