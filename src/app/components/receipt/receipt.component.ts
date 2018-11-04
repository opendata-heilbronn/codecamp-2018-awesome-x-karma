import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recenipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.scss']
})
export class ReceiptComponent implements OnInit {
  userData: any = null;
  receipt: any = null;
  articles: any[] = [];

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe(result => {
      this.userService.userData.subscribe(data => {
        this.receipt = data.receipts[result['id']];
        this.articles = Object.keys(this.receipt.articles).map(key => {
          var article = this.receipt.articles[key];
          article.key = key;
          return article;
        });
      });
    });
  }
}
