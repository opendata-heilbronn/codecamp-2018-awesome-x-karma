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
  showNavbar: boolean = true;

  constructor(
    private auth: AngularFireAuth,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.auth.user.subscribe(user => {
      if (user == null) {
        this.user = null;
        this.userLoggedIn = false;
        return;
      }
      this.user = user;
      this.userLoggedIn = true;
    });
  }

  signOut() {
    this.userService.logout();
  }

  toggleNavbar() {
    this.showNavbar = !this.showNavbar;
  }
}
