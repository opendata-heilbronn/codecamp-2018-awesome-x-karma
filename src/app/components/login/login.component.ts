import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

import { AngularFireAuth } from 'angularfire2/auth';
import { User } from 'firebase';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: User;

  email: string;
  password: string;

  constructor(
    private db: AngularFireDatabase,
    private auth: AngularFireAuth,
    private router: Router
  ) { }

  ngOnInit() {
    this.auth.user.subscribe(user => {
      if (user != null) {
        this.user = user;
        console.log(this.user);
        this.router.navigate(['index']);
      }
    });
  }

  loginWithUsernamePassword() {
    this.auth.auth.signInWithEmailAndPassword(this.email, this.password);
  }

  loginWithGoogle() {
    this.auth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

}
