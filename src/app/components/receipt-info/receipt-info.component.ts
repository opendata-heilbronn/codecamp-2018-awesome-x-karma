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

  // in ms
  private animationDuration = 1000;

  constructor() {}

  ngOnInit() {
    let start = Date.now();
    let intervalHandle = setInterval(() => {
      let time = Date.now() - start;
      this.currentProgress = this.easeInOutQuart(
        time,
        0,
        this.progress - 0,
        this.animationDuration
      );
      if (time >= this.animationDuration) clearInterval(intervalHandle);
    }, 20);
  }

  easeInOutQuart(t, b, c, d) {
    if ((t /= d / 2) < 1) return (c / 2) * t * t * t * t + b;
    return (-c / 2) * ((t -= 2) * t * t * t - 2) + b;
  }
}
