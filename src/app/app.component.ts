import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'mplayer';
    route: string;
    constructor(public router: Router) {
        this.route = router.url;

    }

    isAuthRoute() {
        return this.router.url.startsWith('/login')  || this.router.url === '/signup';
    }

}
