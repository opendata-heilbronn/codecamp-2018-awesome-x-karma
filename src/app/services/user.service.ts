import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from 'firebase';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public user: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  constructor(
    private auth: AngularFireAuth,
    private router: Router) {
    this.auth.user.subscribe(user => {
      if (user == null)
        return;

      this.user.next(user);
      this.isAuthenticated.next(true);

      console.log(user);
    });
  }

  logout() {
    this.auth.auth.signOut().then(() => {
      this.user.next(null);
      this.isAuthenticated.next(false);
      this.router.navigate(['login']);
    });
  }
}
