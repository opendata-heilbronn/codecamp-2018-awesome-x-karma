import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import jsQR from 'jsqr';
import { BehaviorSubject} from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { User } from 'firebase';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-qr-scan',
  templateUrl: './qr-scan.component.html',
  styleUrls: ['./qr-scan.component.scss']
})

export class QrScanComponent implements OnInit {
  user: User = null;
  output: BehaviorSubject<String> = new BehaviorSubject<String>(null);
  users = null;
  receipts = null;

  openModal() {
    this.popup.nativeElement.className = this.popup.nativeElement.className.concat(" open");
    document.querySelector('body').className = document.querySelector('body').className.concat(" popup-active")
    this.video.nativeElement.pause()
  }

  validateReceipt(data: String) {
    if (typeof data === 'string' && data.length > 0) {
      let receiptNumber = data.split(':')[0]
      let articleNumbers = data.split(':')[1].split(' ').filter((string) => string.length > 0)
      let obj = {};
      articleNumbers.forEach(function(value) {
        obj[receiptnumber] = {"date": "04.11.2018"}
        obj
      })
      obj[receiptNumber]
      this.receipts.push({})
    }
  }

  drawLine(begin, end, color) {
    let canvas = this.canvas.nativeElement.getContext('2d');
    canvas.beginPath();
    canvas.moveTo(begin.x, begin.y);
    canvas.lineTo(end.x, end.y);
    canvas.lineWidth = 4;
    canvas.strokeStyle = color;
    canvas.stroke();
  }

  tick() {
    // debugger
    let video = this.video.nativeElement;
    let canvasElement = this.canvas.nativeElement;
    let canvas = this.canvas.nativeElement.getContext('2d');
    // loadingMessage.innerText = "⌛ Loading video..."
    if (video.readyState === video.HAVE_ENOUGH_DATA) {
      // loadingMessage.hidden = true;
      canvasElement.hidden = false;
      // outputContainer.hidden = false;

      canvasElement.height = video.videoHeight;
      canvasElement.width = video.videoWidth;
      canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
      var imageData = canvas.getImageData(
        0,
        0,
        canvasElement.width,
        canvasElement.height
      );
      var code = jsQR(imageData.data, imageData.width, imageData.height);
      if (code) {
        this.drawLine(
          code.location.topLeftCorner,
          code.location.topRightCorner,
          '#FF3B58'
        );
        this.drawLine(
          code.location.topRightCorner,
          code.location.bottomRightCorner,
          '#FF3B58'
        );
        this.drawLine(
          code.location.bottomRightCorner,
          code.location.bottomLeftCorner,
          '#FF3B58'
        );
        this.drawLine(
          code.location.bottomLeftCorner,
          code.location.topLeftCorner,
          '#FF3B58'
        );
        // outputMessage.hidden = true;
        // outputData.parentElement.hidden = false;

        if (this.output.getValue() != code.data) {
          this.output.next(code.data);
        }
      } else {
        // outputMessage.hidden = false;
        // outputData.parentElement.hidden = true;
      }
    }
    requestAnimationFrame(() => this.tick());
  }

  constructor(private userService: UserService, db: AngularFireDatabase) {
    this.userService.user.subscribe(user => {
      this.user = user;
    });
    this.users = db.object('/users/' + this.user.uid).valueChanges().subscribe((data) => {
      console.log(data)
    });
    this.receipts = db.list('/users/' + this.user.uid + '/receipts')
    // debugger
  }

  @ViewChild('myCanvas')
  canvas: ElementRef;
  @ViewChild('preview')
  video: ElementRef;

  ngAfterViewInit() {
    console.log(this.canvas.nativeElement.width);
    var canvas = this.canvas.nativeElement.getContext('2d');
  }

  ngOnInit() {
    navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } }).then((stream) => {
      this.video.nativeElement.srcObject = stream;
      this.video.nativeElement.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
      this.video.nativeElement.play();
      requestAnimationFrame(() => this.tick());
    });

    this.output.subscribe(this.validateReceipt);
  }
}
