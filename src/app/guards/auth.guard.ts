import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(public userService: UserService, public router: Router) { }

  canActivate(): boolean {

    console.log(this.userService.isAuthenticated);

    if (!this.userService.isAuthenticated) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
