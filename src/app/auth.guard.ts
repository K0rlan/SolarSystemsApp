import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {AuthService} from './services/auth.service';

@Injectable()
export class AuthClass implements CanActivate{
  constructor(private auth: AuthService, private router: Router) {
  }

  // tslint:disable-next-line:typedef
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = this.auth.userValue[0];
    if (user) {
      // authorised so return true
      this.auth.setStatus();
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['login']);
    return false;
  }
}
