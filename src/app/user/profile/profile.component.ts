import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from 'src/app/models/role';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteUserComponent } from 'src/app/templates/delete-user/delete-user.component';
import { ChangeUserRoleComponent } from 'src/app/templates/change-user-role/change-user-role.component';
import { faEdit, faUserTimes, faUserTag, faBan, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { ModalComponent } from 'src/app/templates/modal/modal.component';
import { NotificationsService } from 'angular2-notifications';
import { UserStatus } from 'src/app/models/status';
import { Album } from 'src/app/models/album';
import { Playlist } from 'src/app/models/playlist';
import { NewMessageComponent } from 'src/app/messages/new-message/new-message.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

    // ICONS
    faEdit = faEdit;
    faUserDel = faUserTimes;
    faUserRole = faUserTag;
    faMessage = faEnvelope;
    faBan = faBan;
    // Models
    user: User;
    currentUser: User;
    albums: Array<Album> = [];
    playlists: Array<Playlist> = [];

    constructor(
        private auth: AuthService,
        private api: ApiService,
        private route: ActivatedRoute,
        private modalService: NgbModal,
        private router: Router,
        private notifier: NotificationsService
    ) {
    }
    ngOnInit() {
        this.auth.currentUser.subscribe(currentUser => {
            this.currentUser = currentUser;
            console.log(currentUser);
            if (this.route.snapshot.url[1].path === 'profile') {
                this.api.getUser(currentUser.id).subscribe((user: User) => {
                    this.user = user;
                    this.getPlaylists();
                    this.getAlbums();
                });
            }
        });
        if (this.route.snapshot.url[1].path !== 'profile') {
            const userId = parseInt(this.route.snapshot.paramMap.get('id'));
            this.api.getUser(userId).subscribe((user: User) => {
                console.log(user);
                this.user = user;
                this.getPlaylists();
                this.getAlbums();
            });
        }
    }

    getPlaylists() {
        this.api.getPlaylistsByUser(this.user.id).subscribe( (playlists) => {
            console.log(playlists);
            this.playlists = playlists;
        });
    }

    getAlbums() {
        this.api.getAlbumsByUser(this.user.id).subscribe( (albums) => {
            console.log(albums);
            this.albums = albums;
        });
    }

    isAdmin() {
        return  this.currentUser && this.currentUser.role === Role.Admin;
    }

    isCurrentUser() {
        return this.currentUser && this.user && this.user.id === this.currentUser.id;
    }

    editUser() {
        // TODO open edit form in modal
        console.log('Edit user');
    }

    sendMessage() {
        const modalRef = this.modalService.open(NewMessageComponent);
        modalRef.result.then((result) => {
            console.log(result);
        }, (reason) => console.log('Dismissed:' + reason));
        modalRef.componentInstance.user = this.user;
        modalRef.componentInstance.senderId = this.currentUser.id;
        console.log('Send message');
    }

    changeRole() {
        const modalRef = this.modalService.open(ChangeUserRoleComponent);
        modalRef.result.then((result) => {
            console.log(result);
            if (result.role) {
                this.user.role = result.role;
            }
        }, (reason) => console.log('Dismissed:' + reason));
        modalRef.componentInstance.user = this.user;
    }

    blockUser(block = true) {
        let status: UserStatus;
        let action: string;
        if (block) {
            status = UserStatus.BLOCKED;
            action = 'Block';
        } else {
            status = UserStatus.ACTIVE;
            action = 'Unblock';
        }
        const modalRef = this.modalService.open(ModalComponent);
        modalRef.result.then((res: any) => {
            if (res === 'Ok') {
                this.api.updateUserStatus(this.user.id, status).subscribe((update) => {
                    console.log(update);
                    this.notifier.success(`User ${action}ed`);
                    this.user.status = status;
                });
            }
        }, (reason) => console.log('Dismissed:' + reason));
        modalRef.componentInstance.title = `${action} User`;
        modalRef.componentInstance.body = `Are you sure you want to ${action} this user?`;
        modalRef.componentInstance.okMsg = `${action} User`;
    }

    get isBlocked() {
        return this.user && this.user.status === UserStatus.BLOCKED;
    }

    deleteUser() {
        // TODO delete user
        const modalRef = this.modalService.open(DeleteUserComponent);
        modalRef.result.then((result) => {
            console.log(result);
            if (result === 'deleted') {
                this.router.navigate(['/admin']);
            }
        }, (reason) => console.log('Dismissed:' + reason));
        modalRef.componentInstance.user = this.user;
    }

    createModal(action: string, model: string, modelName: string ) {
        const modalRef = this.modalService.open(ModalComponent);
        modalRef.componentInstance.title = `${action} ${model}: ${modelName}`;
        modalRef.componentInstance.body = `Are you sure you want to ${action} this ${model}?`;
        modalRef.componentInstance.okMsg = `${action} ${model}`;
        return modalRef;
    }

    deleteAlbum(i: number) {
        const album = this.albums[i];
        this.createModal('Delete', 'Album', album.name).result.then(
            (res) => {
                console.log(res);
                if (res === 'Ok') {
                    this.api.deleteAlbum(album.id).subscribe((r) => {
                        console.log(r);
                        this.notifier.success('Album deleted!');
                        this.albums.splice(i, 1);
                    });
                }
            },
            (reason) => console.log(reason)
        );
    }

    deletePlaylist(i: number) {
        const pl = this.playlists[i];
        this.createModal('Delete', 'Playlists', pl.name).result.then(
            (res) => {
                console.log(res);
                if (res === 'Ok') {
                    this.api.deletePlaylist(pl.id).subscribe((r) => {
                        console.log(r);
                        this.notifier.success('Playlist deleted!');
                        this.playlists.splice(i, 1);
                    });
                }
            },
            (reason) => console.log(reason)
        );
    }
}
