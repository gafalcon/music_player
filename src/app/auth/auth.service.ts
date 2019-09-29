import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    apiUrl = 'http://localhost:8080/auth/';
    public user: User;

    username = 'gabo';
    password = 'password';

    constructor() { }

    login(user) {
        if (user.username === this.username && user.password === this.password) {
            this.user = new User(1, this.username, '', '', '', this.password, '');
            return of(this.user);
        } else {
            return throwError('username or password incorrect.');
        }
    }

    logout() {
        this.user = null;
    }

    signup(user: User) {
        this.user = user;
        this.user.id = 1;
        return of(this.user);
    }

    isAuthenticated() {
        return this.user != null;
    }
}
