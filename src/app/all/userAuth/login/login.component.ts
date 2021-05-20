import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import { map } from 'rxjs/operators';
import {User} from '../../../model/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit  {
  signInForm: FormGroup;
  user: User  = null;

  constructor(private service: AuthService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.signInForm = this.fb.group({
      email: new FormControl('', [Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      password: new FormControl('', [Validators.required])
    });
  }

  // tslint:disable-next-line:typedef
  get email(){
    return this.signInForm.get('email');
  }
  // tslint:disable-next-line:typedef
  get password(){
    return this.signInForm.get('password');
  }
  // tslint:disable-next-line:typedef
  get getter() { return this.signInForm.controls; }

  // tslint:disable-next-line:typedef
  setStatus(){
    this.service.checkEmail(this.email.value, this.password.value).pipe(first())
      .subscribe(
        data => {
          this.user = data;
          if (data.length !== 0){
            console.log(this.user);
            this.service.setStatus();
            console.log('Successfully logged in');
            this.router.navigate(['']);
          }else {
            alert('Wrong password or email');
          }
        },
        error => {
          alert('error');
        }
      );
  }
}
