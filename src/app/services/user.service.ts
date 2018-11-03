import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public isAuthenticated: boolean = true;
  public user: User;

  constructor(private auth: AngularFireAuth) {
    this.auth.user.subscribe(user => {
      if (user == null)
        return;
        
      this.user = user;
      this.isAuthenticated = true;

      console.log(this.user);
    });
  }
}
