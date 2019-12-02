import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/user';
import { Role } from 'src/app/models/role';
import { ApiService } from 'src/app/services/api.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-new-message',
  templateUrl: './new-message.component.html',
  styleUrls: ['./new-message.component.css']
})
export class NewMessageComponent implements OnInit {

    @Input() user: User = new User(1, 'username', 'Gabriel', 'Falcones', '', '', '', '', Role.Admin);
    @Input() senderId: number;
    message: string;

    constructor(
        private api: ApiService,
        public activeModal: NgbActiveModal,
        private notifier: NotificationsService
    ) { }

    ngOnInit() {
    }

    postMessage() {
        console.log(this.message);
        if (this.message) {
            this.api.newMessage(this.senderId, this.user.id, this.message).subscribe(
                (message) => {
                    console.log(message);
                    this.notifier.success('Message Sent!');
                    this.activeModal.close('sent');
                },
                (err) => {
                    console.log(err);
                    this.notifier.error('Error sending message!');
                    this.activeModal.close('Error');
                }
            );
            console.log('Post: ' + this.message);
        }
    }
}
