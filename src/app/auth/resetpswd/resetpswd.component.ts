import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { OAuthService } from 'angular-oauth2-oidc';
import { NotificationsService } from 'angular2-notifications';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-resetpswd',
  templateUrl: './resetpswd.component.html',
  styleUrls: ['./resetpswd.component.css']
})
export class ResetpswdComponent implements OnInit {

  form: FormGroup;
    public wasValidated = false;
    public loginInvalid = false;
    public usernameError = 'Please enter your username';
    returnUrl: string;



  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private oauthService: OAuthService,
              private notifier: NotificationsService,
              private route: ActivatedRoute,
              private router: Router) {
                // if (this.authService.currentUserValue) {
                //   notifier.warn('Already logged In!');
                //   this.router.navigate(['/']);
                // }
              }

  get username() { return this.form.get('username'); }

  ngOnInit() {
    // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  usernameValid() {
    return this.username.invalid && (this.username.dirty || this.username.touched) || this.loginInvalid;
}

  onSubmit() {
    this.wasValidated = true;
    console.log(this.form.value);
    if (this.form.status !== 'VALID') {
            this.notifier.error('There are errors in your form');
            return;
        }
    console.log('user ' + this.username.value);
    this.authService.reset(this.username.value).subscribe(data => {
      console.log(JSON.stringify(data));
    });
  }
}
