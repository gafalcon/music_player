import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/user';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/services/api.service';
import { NotificationsService } from 'angular2-notifications';
import { faUser, faUserTie, faUserShield } from '@fortawesome/free-solid-svg-icons';
import { Role } from 'src/app/models/role';

@Component({
  selector: 'app-change-user-role',
  templateUrl: './change-user-role.component.html',
  styleUrls: ['./change-user-role.component.css']
})
export class ChangeUserRoleComponent implements OnInit {
    @Input() user: User;
    role: Role;

    faUser = faUser;
    faUserTie = faUserTie;
    faUserAdmin = faUserShield;

    constructor(
        public activeModal: NgbActiveModal,
        private api: ApiService,
        private notifier: NotificationsService
    ) { }

    ngOnInit() {
    }

    editUserRole() {
        if (this.role && this.user.role !== this.role) {
            this.api.updateUserRole(this.user.id, this.role).subscribe(
                (res) => {
                    console.log(res);
                    this.notifier.success('User role edited!');
                    this.activeModal.close({ role: this.role});
                },
                (err) => {
                    console.log(err);
                    this.notifier.error('Error updating role: ' + err.error.error);
                    this.activeModal.close('Error');
                }
            );
        }
    }
}
