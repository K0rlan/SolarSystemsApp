import { Component, OnInit } from '@angular/core';
import {ComponentCanDeactivate} from '../../../exit.order.guard';
import {Observable} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../../services/auth.service';
import {first} from 'rxjs/operators';
import {User} from '../../../model/User';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, ComponentCanDeactivate {

  saved = false;
  users: User[] = [];
  id: number;

  signUpForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
    password: new FormControl('', [Validators.required,
      Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$')]),
    repeatPassword: new FormControl('', [Validators.required])
  });

  constructor(private router: Router, private service: AuthService, private route: ActivatedRoute) { }

  createUser(): any {
    this.getUserList();

    this.service.register(new User(this.id, this.signUpForm.getRawValue().name,
      this.signUpForm.getRawValue().email, this.signUpForm.getRawValue().password) )
      .pipe(first())
      .subscribe(
        data => {
          alert('Successfully registered');
          this.router.navigate(['../login'], { relativeTo: this.route });
        },
        error => {
          alert('error');
        });

  }

  create(): any {
    this.service.getByEmail(this.signUpForm.getRawValue().email)
      .pipe(first())
      .subscribe(data => {
        if (data.length === 0) {
          this.createUser();
        } else {
          alert('A user with this email already exists');
        }
      });
  }

  // tslint:disable-next-line:typedef
  getUserList() {
    console.log(this.signUpForm.getRawValue());
    this.service.get().subscribe(res => {
      this.id = res.length + 1;
      this.users = res;
      console.log('getUserList');
      console.log(typeof this.users);
    });
  }

  get email(): any{
    return this.signUpForm.get('email');
  }

  get name(): any{
    return this.signUpForm.get('name');
  }

  get password(): any{
    return this.signUpForm.get('password');
  }

  get repeatPassword(): any{
    return this.signUpForm.get('repeatPassword');
  }

  checkPasswords(group: FormGroup): any { // here we have the 'passwords' group
    const password = group.get('password').value;
    const confirmPassword = group.get('repeatPassword').value;

    return password === confirmPassword ? null : { notSame: true };
  }

  save(): any{
    this.saved = true;
    this.router.navigate(['login']);
    console.log('Successful');
  }

  ngOnInit(): void {
  }

  canDeactivate(): boolean | Observable<boolean> {
    if (!this.saved){
      return confirm('Registration is not completed. Want to exit?');
    }
    return true;
  }

}

