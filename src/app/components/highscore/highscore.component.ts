import { Component, OnInit } from '@angular/core';
import { HighscoreService } from '../../services/highscore.service';
import { User } from 'firebase';

@Component({
  selector: 'app-highscore',
  templateUrl: './highscore.component.html',
  styleUrls: ['./highscore.component.scss']
})
export class HighscoreComponent implements OnInit {
  constructor(private highscoreService: HighscoreService) {}
  users: any = [];

  ngOnInit() {
    this.highscoreService.users.subscribe(users => {
      console.log(users);
      this.users = users;
    });
  }
}
