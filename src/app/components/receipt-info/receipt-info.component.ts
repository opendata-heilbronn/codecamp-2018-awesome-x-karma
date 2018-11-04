import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { UtilService } from '../../services/util.service';

@Component({
  selector: 'app-receipt-info',
  templateUrl: './receipt-info.component.html',
  styleUrls: ['./receipt-info.component.scss']
})
export class ReceiptInfoComponent implements OnInit {
  @Input()
  progress: number = this.utilService.getRandomInt(10, 90);
  currentProgress: number = 0;

  @Input()
  description: string = '';

  // in ms
  private animationDuration = 1000;

  constructor(
    private userService: UserService,
    private utilService: UtilService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe(result => {
      result['id'];
    });

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
