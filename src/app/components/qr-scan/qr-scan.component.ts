import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import jsQR from 'jsqr';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-qr-scan',
  templateUrl: './qr-scan.component.html',
  styleUrls: ['./qr-scan.component.scss']
})
export class QrScanComponent implements OnInit {
  output: BehaviorSubject<String> = new BehaviorSubject<String>(null);

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

  constructor() {}

  @ViewChild('myCanvas')
  canvas: ElementRef;
  @ViewChild('preview')
  video: ElementRef;

  ngAfterViewInit() {
    console.log(this.canvas.nativeElement.width);
    var canvas = this.canvas.nativeElement.getContext('2d');
  }

  ngOnInit() {
    // var video = this.video.nativeElement
    // let tick = this.tick
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: 'environment' } })
      .then(stream => {
        this.video.nativeElement.srcObject = stream;
        this.video.nativeElement.setAttribute('playsinline', true); // required to tell iOS safari we don't want fullscreen
        this.video.nativeElement.play();
        requestAnimationFrame(() => this.tick());
      });

    this.output.subscribe(data => console.log(data));
  }
}
