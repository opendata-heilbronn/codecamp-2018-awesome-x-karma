import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'firebase';
import { SafePipe } from 'src/app/pipes/safe.pipe';
import { SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: User = null;
  imageUrl: SafeUrl = null;

  constructor(
    private userService: UserService) {}

  ngOnInit() {
    this.userService.user.subscribe(user => {
      this.user = user;
    });
  }

}
