import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

    form: FormGroup;
    country_list = ['Afghanistan','Albania','Algeria','Andorra','Angola','Anguilla','Antigua &amp; Barbuda','Argentina','Armenia','Aruba','Australia','Austria','Azerbaijan','Bahamas'
	                  ,'Bahrain','Bangladesh','Barbados','Belarus','Belgium','Belize','Benin','Bermuda','Bhutan','Bolivia','Bosnia &amp; Herzegovina','Botswana','Brazil','British Virgin Islands'
	                  ,'Brunei','Bulgaria','Burkina Faso','Burundi','Cambodia','Cameroon','Canada','Cape Verde','Cayman Islands','Chad','Chile','China','Colombia','Congo','Cook Islands','Costa Rica'
	                  ,'Cote D Ivoire','Croatia','Cruise Ship','Cuba','Cyprus','Czech Republic','Denmark','Djibouti','Dominica','Dominican Republic','Ecuador','Egypt','El Salvador','Equatorial Guinea'
	                  ,'Estonia','Ethiopia','Falkland Islands','Faroe Islands','Fiji','Finland','France','French Polynesia','French West Indies','Gabon','Gambia','Georgia','Germany','Ghana'
	                  ,'Gibraltar','Greece','Greenland','Grenada','Guam','Guatemala','Guernsey','Guinea','Guinea Bissau','Guyana','Haiti','Honduras','Hong Kong','Hungary','Iceland','India'
	                  ,'Indonesia','Iran','Iraq','Ireland','Isle of Man','Israel','Italy','Jamaica','Japan','Jersey','Jordan','Kazakhstan','Kenya','Kuwait','Kyrgyz Republic','Laos','Latvia'
	                  ,'Lebanon','Lesotho','Liberia','Libya','Liechtenstein','Lithuania','Luxembourg','Macau','Macedonia','Madagascar','Malawi','Malaysia','Maldives','Mali','Malta','Mauritania'
	                  ,'Mauritius','Mexico','Moldova','Monaco','Mongolia','Montenegro','Montserrat','Morocco','Mozambique','Namibia','Nepal','Netherlands','Netherlands Antilles','New Caledonia'
	                  ,'New Zealand','Nicaragua','Niger','Nigeria','Norway','Oman','Pakistan','Palestine','Panama','Papua New Guinea','Paraguay','Peru','Philippines','Poland','Portugal'
	                  ,'Puerto Rico','Qatar','Reunion','Romania','Russia','Rwanda','Saint Pierre &amp; Miquelon','Samoa','San Marino','Satellite','Saudi Arabia','Senegal','Serbia','Seychelles'
	                  ,'Sierra Leone','Singapore','Slovakia','Slovenia','South Africa','South Korea','Spain','Sri Lanka','St Kitts &amp; Nevis','St Lucia','St Vincent','St. Lucia','Sudan'
	                  ,'Suriname','Swaziland','Sweden','Switzerland','Syria','Taiwan','Tajikistan','Tanzania','Thailand','Timor L\'Este','Togo','Tonga','Trinidad &amp; Tobago','Tunisia'
	                  ,'Turkey','Turkmenistan','Turks &amp; Caicos','Uganda','Ukraine','United Arab Emirates','United Kingdom','United States','United States Minor Outlying Islands','Uruguay'
	                  ,'Uzbekistan','Venezuela','Vietnam','Virgin Islands (US)','Yemen','Zambia','Zimbabwe'];

    constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router, private notifier: NotificationsService) {
        this.form = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            gender: ['', Validators.required],
            email: ['', [Validators.email, Validators.required]],
            username: ['', Validators.required],
            password: ['', Validators.required],
            confirmPassword: ['', Validators.required],
            country: ['', Validators.required]
        }, {validators: this.confirmPassValidator});
    }

    get firstName() { return this.form.get('firstName'); }
    get lastName() { return this.form.get('lastName'); }
    get gender() { return this.form.get('gender'); }
    get email() { return this.form.get('email'); }
    get username() { return this.form.get('username'); }
    get password() { return this.form.get('password'); }
    get confirmPassword() { return this.form.get('confirmPassword'); }
    get country() { return this.form.get('country'); }

    invalidField(formField: AbstractControl) {
        return formField.invalid && (formField.dirty || formField.touched)
    }

    confirmPassValidator: ValidatorFn = (control: FormGroup) => {
        const password = control.get('password');
        const confirmPassword = control.get('confirmPassword');
        return password && confirmPassword && password.value === confirmPassword.value ? null : {'passwordMismatch': true};
    }

    getFieldClass(formField: AbstractControl, addClass='form-control') {
        if (formField.touched || formField.dirty){
            const classes = formField.invalid ? ' is-invalid' : ' is-valid';
            return addClass + classes;
        }
        return addClass;
    }
    getConfirmPassClass() {
        const addClass = 'form-control';
        const formField = this.confirmPassword;
        if (formField.touched || formField.dirty){
            const classes = (formField.invalid || (this.form.errors && this.form.errors.passwordMismatch)) ? ' is-invalid' : ' is-valid';
            return addClass + classes;
        }
        return addClass;
    }
    ngOnInit() {
    }

    onSubmit() {
        this.form.markAllAsTouched();
        if (this.form.status !== 'VALID') {
            this.notifier.error('There are errors in your form');
            console.log(this.form.errors);
            return;
        }
        console.log(this.form.value);
        const vals = { ...this.form.value };

        const user = new User(null,
                              vals.username,
                              vals.firstName,
                              vals.lastName,
                              vals.gender,
                              vals.password,
                              vals.email, null);

        this.authService.signup(user).subscribe((newUser) => {
            console.log(newUser);
            this.notifier.success('User created!');
            this.router.navigate(['/']);
        });
    }
}
