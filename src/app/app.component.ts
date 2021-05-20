import {Component} from '@angular/core';
import {User} from './model/User';
import {AuthService} from './services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Koko';
  user: User;

  constructor(private auth: AuthService, private router: Router) {
    this.user = this.auth.userValue;
  }

  // tslint:disable-next-line:typedef
  isLoggedIn() {
    console.log('Show nav-menu');
    return this.auth.isLoggedIn();
  }
}
