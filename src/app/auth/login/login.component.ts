import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    public wasValidated = false;
    public loginInvalid = false;
    public usernameError = 'Please enter your username';
    public passwordError = 'Please enter your password';
    constructor(private formBuilder: FormBuilder,
                private authService: AuthService,
                private notifier: NotificationsService,
                private router: Router) {
        this.form = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }
    get password() { return this.form.get('password'); }
    get username() { return this.form.get('username'); }
    ngOnInit() {
    }

    usernameValid() {
        return this.username.invalid && (this.username.dirty || this.username.touched) || this.loginInvalid;
    }

    passwordValid() {
        return this.password.invalid && (this.password.dirty || this.password.touched) || this.loginInvalid;
    }

    onSubmit() {
        this.wasValidated = true;
        console.log(this.form.value);
        if (this.form.status !== 'VALID') {
            this.notifier.error('There are errors in your form');
            return;
        }
        this.authService.login(this.form.value).subscribe(
            (user) => {
                console.log(user);
                this.router.navigate(['/']);
            },
            (error) => {
                this.loginInvalid = true;
                this.wasValidated = false;
                this.notifier.error(error);
            }
        );
    }

}
