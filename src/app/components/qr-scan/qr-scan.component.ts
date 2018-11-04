import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { User } from 'firebase';
import { UserService } from 'src/app/services/user.service';
import { ScanService } from 'src/app/services/scan.service';
import { KarmaService } from 'src/app/services/karma.service';
import { JsonService } from 'src/app/services/json.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-qr-scan',
  templateUrl: './qr-scan.component.html',
  styleUrls: ['./qr-scan.component.scss']
})
export class QrScanComponent implements OnInit {
  user: User = null;
  output: BehaviorSubject<String> = new BehaviorSubject<String>(null);
  userData = null;

  constructor(
    private router: Router,
    private userService: UserService,
    private karmaService: KarmaService,
    private jsonService: JsonService,
    private db: AngularFireDatabase,
    private scanService: ScanService) { }

  @ViewChild('myCanvas') canvas: ElementRef;
  @ViewChild('preview') video: ElementRef;
  @ViewChild('popup') popup: ElementRef;

  ngAfterViewInit() {
    console.log(this.canvas.nativeElement.width);
    var canvas = this.canvas.nativeElement.getContext("2d");
  }

  ngOnInit() {

    this.userService.user.subscribe(user => {
      if (user == null) { return; }
      this.user = user;
    });

    this.userService.userData.subscribe(data => {
      if (data == null) { return; }
      this.userData = data;
    });

    this.scanService.canvas = this.canvas;
    this.scanService.video = this.video;

    this.scanService.data.subscribe(data => {
      if (data) {
        console.log(data);
        this.validateReceipt(data);
      }
    });
    this.scanService.Start();
  }

  openModal() {
    this.popup.nativeElement.className = this.popup.nativeElement.className.concat(" open");
    document.querySelector('body').className = document.querySelector('body').className.concat(" popup-active")
    this.video.nativeElement.pause()
  }

  validateReceipt(data: String) {
    if (data.length > 0) {
      let receiptNumber = data.split(':')[0]
      let articleNumbers = data.split(':')[1].trim().split(' ');

      console.log('artnums', articleNumbers);

      let receipt = {
        score: 0,
        date: (new Date()).toISOString(),
        articles: { }
      }

      this.db.object<any>('/products').valueChanges().subscribe(result => {
        console.log(result);
        articleNumbers.forEach(nr => {
          this.jsonService.UpdateNode(receipt, 'articles.' + nr, result[nr]);
          receipt.score += this.karmaService.GetKarma(result[nr]);
        });

        console.log('complete receipt', receipt);
  
        if (!this.userData.receipts) { this.userData.receipts = {}; }

        var key = Date.now();
        this.userData.receipts[key] = receipt;
        this.userData.karma += receipt.score;
        this.db.object('/users/' + this.user.uid).set(this.userData);

        this.router.navigate(['receipt/' + key]);
      });
    }
  }
}
