import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { ApiService } from 'src/app/services/api.service';
import { User } from 'src/app/models/user';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChangeUserRoleComponent } from 'src/app/templates/change-user-role/change-user-role.component';
import { DeleteUserComponent } from 'src/app/templates/delete-user/delete-user.component';
import { NewMessageComponent } from 'src/app/messages/new-message/new-message.component';
import { AuthService } from 'src/app/services/auth.service';
import { UserStatus } from 'src/app/models/status';
import { ModalComponent } from 'src/app/templates/modal/modal.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

    users: Array<User>;
    currentUser: User;
    constructor(
        private notifier: NotificationsService,
        private api: ApiService,
        private modalService: NgbModal,
        private auth: AuthService
    ) {
    }

    ngOnInit() {
        this.api.getUsers().subscribe((users: Array<User>) => {
            this.users = users;
        }, (error) => console.log(error));
        this.auth.currentUser.subscribe((currentUser) => {
            this.currentUser = currentUser;
        });
    }

    deleteUser(i: number, user: User) {
        const modalRef = this.modalService.open(DeleteUserComponent);
        modalRef.result.then((result) => {
            console.log(result);
            if (result === 'deleted') {
                this.users.splice(i, 1);
            }
        }, (reason) => console.log('Dismissed:' + reason));
        modalRef.componentInstance.user = user;
    }

    sendMessage(user: User) {
        const modalRef = this.modalService.open(NewMessageComponent);
        modalRef.result.then((result) => {
            console.log(result);
        }, (reason) => console.log('Dismissed:' + reason));
        modalRef.componentInstance.user = user;
        modalRef.componentInstance.senderId = this.currentUser.id;
        console.log('Send message');
    }

    editUser(user: User) {
        const modalRef = this.modalService.open(ChangeUserRoleComponent);
        modalRef.result.then(
            (result) => {
                console.log(result);
                if (result.role) {
                    const role = (result.role);
                    user.role = role;
                }
            },
            (reason) => console.log('Dismissed:' + reason)
        );
        modalRef.componentInstance.user = user;
    }

    isActive(user: User) {
        return user.status === UserStatus.ACTIVE;
    }

    blockUser(user: User) {
        console.log(user.status);
        let newStatus: UserStatus;
        let action: string;
        if (user.status === UserStatus.ACTIVE) {
            newStatus = UserStatus.BLOCKED;
            action = 'Block';
        } else {
            newStatus = UserStatus.ACTIVE;
            action = 'Unblock';
        }
        const modalRef = this.modalService.open(ModalComponent);
        modalRef.result.then((res: any) => {
            if (res === 'Ok') {
                this.api.updateUserStatus(user.id, newStatus).subscribe((update) => {
                    console.log(update);
                    this.notifier.success(`User ${action}ed`);
                    user.status = newStatus;
                });
            }
        }, (reason) => console.log('Dismissed:' + reason));
        modalRef.componentInstance.title = `${action} User`;
        modalRef.componentInstance.body = `Are you sure you want to ${action} this user?`;
        modalRef.componentInstance.okMsg = `${action} User`;
    }

}
