import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-receipt-info',
  templateUrl: './receipt-info.component.html',
  styleUrls: ['./receipt-info.component.scss']
})
export class ReceiptInfoComponent implements OnInit {
  @Input()
  progress: number = 0;
  currentProgress: number = 0;

  @Input()
  description: string = '';

  constructor() {}

  ngOnInit() {
    let intervalHandle = setInterval(() => {
      if (this.progress > this.currentProgress) {
        this.currentProgress++;
      } else {
        clearInterval(intervalHandle);
      }
    }, 20);
  }
}
