import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from 'firebase';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<
    boolean
  >(false);
  public user: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  userData: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(
    private auth: AngularFireAuth,
    private db: AngularFireDatabase,
    private router: Router
  ) {
    this.auth.user.subscribe(user => {
      if (user == null) return;
      this.isAuthenticated.next(true);

      this.db
        .object('/users/' + user.uid)
        .valueChanges()
        .subscribe(data => {
          this.setDefaultValues(user, data).then(qqq => {
            this.userData.next(data);
            this.user.next(user);
          });
        });
    });
  }

  private setDefaultValues(user: User, userData: any) {
    userData.karma = userData.karma || 0;
    userData.receipts = userData.receipts || [];
    userData.name = user.displayName || user.email || user.uid;
    userData.photoUrl = user.photoUrl || '/assets/avatar-mock.png';
    return this.db.object('/users/' + user.uid).set(userData);
  }

  logout() {
    this.auth.auth.signOut().then(() => {
      this.user.next(null);
      this.isAuthenticated.next(false);
      this.router.navigate(['login']);
    });
  }
}
