import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OAuthService, JwksValidationHandler } from 'angular-oauth2-oidc';
import { oauthConfig } from './auth/OAuthConfig';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'mplayer';
    route: string;
    constructor(
        public router: Router,
        private oauthService: OAuthService,
        private authService: AuthService
    ) {
        this.route = router.url;
        this.oauthService.configure(oauthConfig);
        this.oauthService.tokenValidationHandler = new JwksValidationHandler();
        this.oauthService.loadDiscoveryDocumentAndTryLogin( {
            onTokenReceived: (context) => {this.authService.googleLogin(context); }
        });
        // this.authService.testOauth();
        console.log('Has valid token?', this.oauthService.hasValidIdToken());
    }

    isAuthRoute() {
        return this.router.url.startsWith('/login')  || this.router.url === '/signup';
    }

}
