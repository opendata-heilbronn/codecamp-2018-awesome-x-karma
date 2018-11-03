import { Component, OnInit } from '@angular/core';
import { User } from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  userLoggedIn = false;
  user: User;

  constructor(private auth: AngularFireAuth) { }

  ngOnInit() {
    this.auth.user.subscribe(user => {
      if (user == null) {
        return;
      }
      this.user = user;
      this.userLoggedIn = true;
    });
  }

}
