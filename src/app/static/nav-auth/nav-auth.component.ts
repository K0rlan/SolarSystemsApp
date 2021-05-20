import { Component, OnInit } from '@angular/core';
import {User} from '../../model/User';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-nav-auth',
  templateUrl: './nav-auth.component.html',
  styleUrls: ['./nav-auth.component.css']
})
export class NavAuthComponent implements OnInit {
  dateNow: number = Date.now();

  user: User;

  constructor(private accountService: AuthService, private router: Router) {
    this.user = this.accountService.userValue[0];
  }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  logOut() {
    console.log('Log out');
    this.accountService.logout();
  }

}
