import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { of, throwError, BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    authUrl = `${environment.apiUrl}/api/auth`;
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient, private oauthService: OAuthService) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    private storeCredentials(res) {
        if (res.user && res.accessToken) {
            console.log("Storing credentials!!!");
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

    reset(usernameOrEmail: string) {
      // return this.http.post<any>(`${this.authUrl}/reset`, { usernameOrEmail })
      //     .pipe(map(res => {
      //         // login succesful if there's a jwt token and an user
      //         return {status: 'NA'};
      //     }));
      return JSON.parse(usernameOrEmail);
  }

    logout() {
        console.log("LOGOUT!!!!");
        localStorage.removeItem('currentUser');
        localStorage.removeItem('jwtToken');
        this.currentUserSubject.next(null);
        this.oauthService.logOut();
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

    googleLogin(context) {
        // TODO sent googleLogin to server
        console.log('logged in');
        const data = {
            idToken: context.idToken,
            email: context.idClaims.email.toString(),
            firstName: context.idClaims.given_name.toString(),
            lastName: context.idClaims.family_name.toString()
            // profile_photo: context.idClaims.picture
        };
        this.http.post<any>(`${this.authUrl}/oauthLogin`, data).subscribe( res => {
            console.log('oauthLogin res', res);
            this.storeCredentials(res);
        }, err => { console.log('error', err); });

    }

    isAuthenticated() {
        // return this.user != null;
    }
}
