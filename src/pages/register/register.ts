import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl} from '@angular/forms';
import { PasswordValidator } from '../../validators/password-validator';
import { UsernameValidator } from '../../validators/username-validator';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  validations_form: FormGroup;
  matching_passwords_group: FormGroup;
  validation_messages: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder
  ){

  }

  ionViewWillLoad() {

    this.matching_passwords_group = new FormGroup({
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ])),
      confirm_password: new FormControl('', Validators.required)
    }, (formGroup: FormGroup) => {
      return PasswordValidator.areEqual(formGroup);
    });


    this.validations_form = this.formBuilder.group({
      username: new FormControl('', 
      Validators.compose([
        UsernameValidator.validUsername,
        Validators.maxLength(25),
        Validators.minLength(5),
        Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
        Validators.required
      ])),

      name: new FormControl('', Validators.required),

      lastname: new FormControl('', Validators.required),

      email: new FormControl('', 
      Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),

      matching_passwords: this.matching_passwords_group,
    });

    this.validation_messages = {
      'username': [
        { type: 'required', message: 'Username is required.' },
        { type: 'minlength', message: 'Username must be at least 5 characters long.' },
        { type: 'maxlength', message: 'Username cannot be more than 25 characters long.' },
        { type: 'pattern', message: 'Your username must contain only numbers and letters.' },
        { type: 'validUsername', message: 'Your username has already been taken.' }
      ],
      'name': [
        { type: 'required', message: 'Name is required.' }
      ],
      'lastname': [
        { type: 'required', message: 'Last name is required.' }
      ],
      'email': [
        { type: 'required', message: 'Email is required.' },
        { type: 'pattern', message: 'Enter a valid email.' }
      ],
      'password': [
        { type: 'required', message: 'Password is required.' },
        { type: 'minlength', message: 'Password must be at least 5 characters long.' },
        { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number.' }
      ],
      'confirm_password': [
        { type: 'required', message: 'Confirm password is required' }
      ],
      'matching_passwords': [
        { type: 'areEqual', message: 'Password mismatch' }
      ],
    };
  }

  onSubmit(values){
    this.navCtrl.push(TabsPage);
  }

}
