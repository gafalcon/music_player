import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { AuthService } from '../services/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in and request is to api url
        const currentUser = this.authenticationService.currentUserValue;
        const jwtToken = localStorage.getItem('jwtToken');
        const isLoggedIn = currentUser && jwtToken;
        const isApiUrl = request.url.startsWith(environment.apiUrl);
        console.log('Request:', request.url);
        if (isLoggedIn && isApiUrl) {
            console.log('Adding authorization');
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${jwtToken}`
                }
            });
        }

        return next.handle(request);
    }
}
