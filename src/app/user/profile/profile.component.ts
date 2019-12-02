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

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

    user: User;
    currentUser: User;
    faEdit = faEdit;
    faUserDel = faUserTimes;
    faUserRole = faUserTag;
    faMessage = faEnvelope;
    faBan = faBan;

    constructor(
        private auth: AuthService,
        private api: ApiService,
        private route: ActivatedRoute,
        private modalService: NgbModal,
        private router: Router
    ) {
    }
    ngOnInit() {
        this.auth.currentUser.subscribe(currentUser => {
            this.currentUser = currentUser;
            console.log(currentUser);
            if (this.route.snapshot.url[1].path === 'profile') {
                this.api.getUser(currentUser.id).subscribe((user: User) => this.user = user);
            }
        });
        if (this.route.snapshot.url[1].path !== 'profile') {
            const userId = parseInt(this.route.snapshot.paramMap.get('id'));
            this.api.getUser(userId).subscribe((user: User) => {
                console.log(user);
                this.user = user;
            });
        }
    }

    isAdmin() {
        return  this.currentUser && this.currentUser.role === Role.Admin;
    }

    isCurrentUser() {
        return this.currentUser && this.user && this.user.id === this.currentUser.id;
    }

    editUser() {
        //TODO open edit form in modal
        console.log("Edit user");
    }

    sendMessage() {
        // TODO open modal to send message
        console.log("Send message");
    }

    changeRole() {
        // TODO open modal to change user role
        const modalRef = this.modalService.open(ChangeUserRoleComponent);
        modalRef.result.then((result) => {
            console.log(result);
            if (result.role) {
                this.user.role = result.role;
            }
        }, (reason) => console.log('Dismissed:' + reason));
        modalRef.componentInstance.user = this.user;
    }

    blockUser() {
        // TODO block user
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



}
