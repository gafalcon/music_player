import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

    currentUser: User;

    constructor(
        private auth: AuthService
    ) {
        this.auth.currentUser.subscribe(user => {
            console.log(user);
            this.currentUser = user;
        });
    }
    ngOnInit() {

    }

}
