import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    form: FormGroup;
    constructor(private formBuilder: FormBuilder,
                private authService: AuthService,
                private notifier: NotificationsService,
                private router: Router) {
        this.form = this.formBuilder.group({
            username: [''],
            password: ['']
        });
    }

    ngOnInit() {
    }

    onSubmit() {
        console.log(this.form.value);
        this.authService.login(this.form.value).subscribe(
            (user) => {
                console.log(user);
                this.router.navigate(['/']);
            },
            (error) => {
                console.log('error: ' + error);
                this.notifier.alert(error);
            }
        );
    }

}
