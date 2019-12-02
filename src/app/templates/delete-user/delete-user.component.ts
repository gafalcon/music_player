import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/user';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/services/api.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit {
    @Input() user: User;

    constructor(
        public activeModal: NgbActiveModal,
        private api: ApiService,
        private notifier: NotificationsService
    ) { }

    ngOnInit() {
    }

    deleteUser() {
        this.api.deleteUser(this.user.id).subscribe(
            (res) => {
                this.notifier.success('User deleted!');
                console.log(res);
                this.activeModal.close('deleted');
            },
            (err) => {
                console.log(err);
                this.notifier.error('Cannot delete user!!');
                this.activeModal.close('error');
            }
        );
    }

}
