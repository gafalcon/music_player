import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { of, throwError, BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    authUrl = `${environment.apiUrl}/api/auth`;
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    private storeCredentials(res) {
        if (res.user && res.accessToken) {
            localStorage.setItem('currentUser', JSON.stringify(res.user));
            localStorage.setItem('jwtToken', res.accessToken);
            this.currentUserSubject.next(res.user);
        }
    }

    login(usernameOrEmail: string, password: string) {
        return this.http.post<any>(`${this.authUrl}/signin`, { usernameOrEmail, password })
            .pipe(map(res => {
                // login succesful if there's a jwt token and an user
                this.storeCredentials(res);
                return res;
            }));
    }

    logout() {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('jwtToken');
        this.currentUserSubject.next(null);
    }

    signup(user: User) {
        return this.http.post<any>(`${this.authUrl}/signup`, user)
            .pipe(map(res => {
                // Signup succesful if there's a jwt token and an user
                this.storeCredentials(res);
                return res;
            }))
        ;
    }

    isAuthenticated() {
        // return this.user != null;
    }
}
