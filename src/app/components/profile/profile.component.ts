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
  userData: any = null;
  imageUrl: SafeUrl = null;
  receipts: any[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.user.subscribe(user => (this.user = user));
    this.userService.userData.subscribe(data => {
      if (!data) {
        return;
      }
      console.log(data);
      this.userData = data;
      this.receipts = Object.keys(data.receipts)
        .map(key => {
          var obj = data.receipts[key];
          obj.key = key;
          return obj;
        })
        .sort((a, b) => {
          return new Dateg(b.date).getTime() - new Date(a.date).getTime();
        });
    });
  }
}
