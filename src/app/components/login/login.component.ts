import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

import { AngularFireAuth } from 'angularfire2/auth';
import { User } from 'firebase';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';

import * as SVG from 'svg.js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: User;

  email: string;
  password: string;
  svg: any = null;

  planet1: any;
  planet2: any;
  planet3: any;

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
        this.router.navigate(['/']);
        // TODO: In /users die uid und /users/{uid}/karma = 0 setzen
      }
    });

    this.svg = SVG('logo').size(200, 200);
    var sun = this.svg.circle(100).attr({
      stroke: '#fff',
      'stroke-width': 1,
      fill: '#fff',
      cx: 100,
      cy: 100
    });

    var path = this.svg
      .path(
        'm562.6 337.4c0 10-3.9 19-11.6 27-7.7 8-16.6 12-26.6 12-16 0-27.7-7.5-35.2-22.5l-35.2-1.5c-7.5 0-22.3 3.3-44.2 9.8-23.5 6.5-37 11.7-40.5 15.7-5.5 6-10 20-13.5 42-3 18-4.5 31.2-4.5 39.7 0 13.5 2.1 23.4 6.4 29.6 4.3 6.2 13 11.5 26.2 15.7 13.2 4.2 21.4 6.6 24.4 7.1 2 0 5.2-0.2 9.8-0.7l9 0c6.5 0 13.2 1 20.2 3 10 3 14.3 7 12.8 12-7-1-19.2 0.5-36.7 4.5l21 10.5c0 6-8.5 9-25.5 9-4.5 0-10.6-1-18.4-3-7.7-2-12.9-3-15.4-3l-9.7 0c-0.5 5-2 12.5-4.5 22.5-8.5-0.5-18.5-5.5-30-15-11.5-9.5-18.7-14.2-21.7-14.2-3 0-7.3 4.8-12.7 14.2-5.5 9.5-8.2 16-8.2 19.5-6.5-3.5-12-10-16.5-19.5-2-6.5-4.2-13-6.7-19.5-5 0.5-14.2 11-27.7 31.5l-3.8 0c-1-1.5-4.8-12-11.2-31.5-15.5-5-30-7.5-43.5-7.5-6.5 0-16.5 1.5-30 4.5l-21-1.5c3-3 11.7-8.7 26.2-17.2 17-10 30-15 39-15 1.5 0 3.5 0.3 6 0.8 2.5 0.5 4.5 0.8 6 0.8 3.5 0 9.1-1.9 16.9-5.6 7.7-3.7 12.2-7.1 13.5-10.1 1.3-3 1.9-10.8 1.9-23.2 0-28.5-7.5-49.7-22.5-63.7-13-12.5-34.5-21.5-64.5-27-8 28.5-30.5 42.7-67.4 42.7-12 0-24-7.2-36-21.7C44.7 373.8 38.7 360.6 38.7 348.6c0-18.5 7.7-33.7 23.2-45.7-12.5-13-18.7-26.2-18.7-39.7 0-12.5 3.9-23.5 11.6-33 7.7-9.5 17.9-15 30.4-16.5-1-16 4.2-27 15.7-33-5.5-5.5-8.2-15.2-8.2-29.2 0-16.5 5.5-30.2 16.5-41.2 11-11 24.7-16.5 41.2-16.5 18 0 32.7 6.3 44.2 18.8 14.5-49.5 45.7-74.2 93.7-74.2 25 0 47 10 66 30 7 7.5 10.5 11.5 10.5 12-6 0-3-1.1 9-3.4 12-2.2 20.7-3.4 26.2-3.4 19.5 0 36.7 7.2 51.7 21.7 13 13 22 29.5 27 49.5 3.5 0.5 9 2 16.5 4.5 11 5.5 16.5 15 16.5 28.5 0 2.5-2 7.3-6 14.2 32 18 48 43 48 75 0 9-3.5 21.5-10.5 37.5 13 7.5 19.5 18.5 19.5 33m-308.8 33 0-9.7c0-11.5-5.6-22-16.9-31.5-11.2-9.5-22.6-14.2-34.1-14.2-14 0-27 3.2-39 9.7 26.5-1.5 56.5 13.8 89.9 45.7m-13.5-92.9c-7.5-8.5-14-17.2-19.5-26.2-21 5.5-31.5 11.7-31.5 18.7 6-0.5 14.7 0.6 26.2 3.4 11.5 2.8 19.7 4.1 24.8 4.1m45.7-23.2 0-33c-12-2-19.3-3-21.7-3l0 11.2 21.7 24.7m97.4-21c-6-2.5-17.2-7.5-33.7-15l0 64.5c23.5-13.5 34.7-30 33.7-49.5m41.2 88.5-16.5-20.2c-10 7-20.1 14.1-30.4 21.4-10.3 7.2-19.1 15.4-26.6 24.4 22.5-12 47-20.5 73.4-25.5'
      )
      .size(70, 70)
      .cx(100)
      .cy(100)
      .attr({
        fill: '#168198'
      });

    var orbit = this.svg.circle(150).attr({
      stroke: '#fff',
      'stroke-width': 1,
      fill: 'none',
      cx: 100,
      cy: 100
    });

    this.planet1 = this.svg.circle(35).attr({
      fill: '#fff',
      cx: this.getPosition(90, { x: 100, y: 100 }, 75).x,
      cy: this.getPosition(90, { x: 100, y: 100 }, 75).y
    });
    this.planet2 = this.svg.circle(35).attr({
      fill: '#fff',
      cx: this.getPosition(45, { x: 100, y: 100 }, 75).x,
      cy: this.getPosition(45, { x: 100, y: 100 }, 75).y
    });
    this.planet3 = this.svg.circle(35).attr({
      fill: '#fff',
      cx: this.getPosition(135, { x: 100, y: 100 }, 75).x,
      cy: this.getPosition(135, { x: 100, y: 100 }, 75).y
    });
  }

  animatePlanete(planet: any, start) {
    planet.animate(5000).during((pos, morph, eased, situation) => {
      var pos = this.getPosition(360 * pos + start, { x: 100, y: 100 }, 75);
      planet.attr({ cx: pos.x, cy: pos.y });
    });
  }

  getPosition(degrees: number, center: any, radius: number): any {
    var radians = degrees * (Math.PI / 180);

    var x = Math.cos(radians) * radius;
    var y = Math.sin(radians) * radius;

    return {
      x: x + center.x,
      y: y + center.y
    };
  }

  loginWithUsernamePassword() {
    this.animatePlanete(this.planet1, 90);
    this.animatePlanete(this.planet2, 135);
    this.animatePlanete(this.planet3, 45);

    this.auth.auth.signInWithEmailAndPassword(this.email, this.password)
      .then(() => {
        this.router.navigate(['profile']);
      });;
  }

  loginWithGoogle() {
    this.animatePlanete(this.planet1, 90);
    this.animatePlanete(this.planet2, 135);
    this.animatePlanete(this.planet3, 45);

    this.auth.auth
      .signInWithRedirect(new firebase.auth.GoogleAuthProvider())
      .then(() => {
        this.router.navigate(['profile']);
      });
  }
}
