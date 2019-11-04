import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

    allUsers = [
        {username: 'gafalcon', name: 'Gabriel', email: 'gabofalc@gmail.com', rol: 'Admin'},
        {username: 'vinod', name: 'Vinod', email: 'vinod@gmail.com', rol: 'User'},
        {username: 'ishan', name: 'Ishan', email: 'ishan@gmail.com', rol: 'User'},
        {username: 'alex', name: 'Alex', email: 'alex@gmail.com', rol: 'User'},
        {username: 'jeremiah', name: 'Jeremiah', email: 'jeremiah', rol: 'User'},
        // {username: '', name: '', email: '', rol: ''},
    ];

    users: Array<any>;
    constructor(
        private notifier: NotificationsService
    ) {
        this.users = this.allUsers;
    }

    ngOnInit() {
    }

    deleteUser(i) {
        if (confirm("Are you sure you want to delete this User?")) {
            this.users.splice(i, 1);
            this.notifier.success("User deleted");
        }
    }

    editUser(i) {
        console.log(i);
    }

}
