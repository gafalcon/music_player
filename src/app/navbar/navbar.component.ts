import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { Role } from '../models/role';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    currentUser: User;
    faBell = faBell;

    notifications: Array<any> = [];
    unread = 0;

    constructor(
        private auth: AuthService,
        private router: Router,
        private api: ApiService
    ) {
    }

    get isAdmin() {
        return this.currentUser && this.currentUser.role === Role.Admin;
    }

    logout() {
        this.auth.logout();
        this.router.navigate(['/']);
    }

    ngOnInit() {

        this.auth.currentUser.subscribe(user => {
            if (user !== this.currentUser) {
                this.currentUser = user;

                if (this.currentUser) {
                    this.api.getUnreadNotifications().subscribe((notifs: any) => {
                        notifs.forEach((notif) => {
                            if (notif.notifType === 'ROLE_CHANGED') {
                                notif.str = 'Your role has changed!!';
                                notif.link = '/users/profile';
                            } else if (notif.notifType === 'NEW_MESSAGE') {
                                notif.str = 'You have new messages';
                                notif.link = '/users/messages';
                            } else if (notif.notifType === 'ROLE_DENIED') {
                                notif.str = 'Your request to become professional was denied!';
                                notif.link = '/users/profile';
                            } else if (notif.notifType === 'ROLE_REQUEST') {
                                notif.str = `request to become professional from ${notif.extra}!`;
                                notif.link = '/admin/users';
                            } else {
                                notif.str = 'new notification';
                                notif.link = '/users/profile';
                            }
                        });
                        this.notifications = notifs;
                        this.unread = notifs.length;
                        console.log(this.notifications);
                    });
                }
            }
        });
    }

    markAsRead() {
        console.log('mark as read');
        this.unread = 0;
        this.api.markAllAsRead().subscribe(res => console.log(res));
    }

}
