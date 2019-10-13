import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { Role } from '../models/role';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    currentUser: User;
    constructor(
        private auth: AuthService,
        private router: Router
    ) {
        this.auth.currentUser.subscribe(user => this.currentUser = user);
    }

    get isAdmin() {
        return this.currentUser && this.currentUser.role === Role.Admin;
    }

    logout() {
        this.auth.logout();
        this.router.navigate(['/']);
    }

    ngOnInit() {
    }

}
