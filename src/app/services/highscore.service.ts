import { Injectable } from '@angular/core';
import { User } from 'firebase';
import { BehaviorSubject } from 'rxjs';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class HighscoreService {
  public users: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(null);

  constructor(private db: AngularFireDatabase) {
    this.db
      .object('/users/')
      .valueChanges()
      .subscribe(data => {
        const users = [];
        for (const i in data) {
          users.push({ ...data[i], key: i });
        }
        this.users.next(users.sort((a, b) => b.karma - a.karma));
      });
  }
}
