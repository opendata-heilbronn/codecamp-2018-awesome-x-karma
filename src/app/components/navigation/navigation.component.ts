import { Component, OnInit } from '@angular/core';
import { User } from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  userLoggedIn = false;
  user: User;

  constructor(
    private auth: AngularFireAuth,
    private userService: UserService,
    private router: Router
  ) {}

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
