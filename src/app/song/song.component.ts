import { Component, OnInit } from '@angular/core';
import { Song } from '../models/song';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { NotificationsService } from 'angular2-notifications';
import { AmplitudeService } from '../services/amplitude.service';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';
import { faPlay, faPlus } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PlaylistsModalComponent } from '../playlists-modal/playlists-modal.component';

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.css']
})
export class SongComponent implements OnInit {

    faPlay = faPlay;
    faPlus = faPlus;

    song: Song;
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
        private auth: AuthService,
        private modalService: NgbModal
    ) { }

    ngOnInit() {
        const id = +this.route.snapshot.paramMap.get('id');
        this.getData(id);
        this.auth.currentUser.subscribe((user) => {
            this.currentUser = user;
            console.log(this.currentUser);
            if (this.currentUser) {
                this.enableLikes = true;
                this.api.isLikedDisliked(id, 'songs').subscribe((res: any) => {
                    console.log('likes');
                    console.log(res);
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

    getData(id:number) {
        this.api.getSong(id)
            .subscribe(song => {
                this.song = song;
            } );

        this.api.getSongComments(id).subscribe((comments) => {
            this.comments = comments;
            console.log(comments);
        });

    }


    createComment(comment: string) {
        console.log('new comment!!!' + comment);
        this.api.postSongComment(this.song.id, {comment}).subscribe((newComment) => {
            newComment.username = this.currentUser.username;
            newComment.userPhoto = this.currentUser.profilePhoto;
            this.comments.unshift(newComment);
            this.notifier.success('New comment posted!');
        });
    }

    playSong() {
        this.song.totalReproductions += 1;
        this.amplitude.playNow(this.song);
    }

    likeEvent(event: string) {
        this.notifier.success(event);
    }

    addToPlaylist() {
        const modalRef = this.modalService.open(PlaylistsModalComponent);
        modalRef.componentInstance.songToAdd = this.song;
    }
}
