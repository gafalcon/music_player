import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { ApiService } from 'src/app/services/api.service';
import { User } from 'src/app/models/user';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChangeUserRoleComponent } from 'src/app/templates/change-user-role/change-user-role.component';
import { DeleteUserComponent } from 'src/app/templates/delete-user/delete-user.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

    users: Array<User>;
    constructor(
        private notifier: NotificationsService,
        private api: ApiService,
        private modalService: NgbModal
    ) {
    }

    ngOnInit() {
        this.api.getUsers().subscribe((users: Array<User>) => {
            this.users = users;
        }, (error) => console.log(error));
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

}
