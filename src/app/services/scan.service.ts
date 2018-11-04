import { Injectable, ElementRef } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import jsQR from 'jsqr';

@Injectable({
  providedIn: 'root'
})
export class ScanService {

  video: ElementRef;
  canvas: ElementRef;

  data: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor() { }

  Start(): void {
    navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } }).then((stream) => {
      this.video.nativeElement.srcObject = stream;
      this.video.nativeElement.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
      this.video.nativeElement.play();
      requestAnimationFrame(() => this.tick());
    });
  }


  drawLine(begin, end, color) {
    let canvas = this.canvas.nativeElement.getContext("2d");
    canvas.beginPath();
    canvas.moveTo(begin.x, begin.y);
    canvas.lineTo(end.x, end.y);
    canvas.lineWidth = 4;
    canvas.strokeStyle = color;
    canvas.stroke();
  }


  tick() {
    let video = this.video.nativeElement;
    let canvasElement = this.canvas.nativeElement;
    let canvas = this.canvas.nativeElement.getContext("2d");
    // loadingMessage.innerText = "⌛ Loading video..."
    if (video.readyState === video.HAVE_ENOUGH_DATA) {
      // loadingMessage.hidden = true;
      canvasElement.hidden = false;
      // outputContainer.hidden = false;

      canvasElement.height = video.videoHeight;
      canvasElement.width = video.videoWidth;
      canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
      var imageData = canvas.getImageData(0, 0, canvasElement.width, canvasElement.height);
      var code = jsQR(imageData.data, imageData.width, imageData.height);
      if (code) {
        this.drawLine(code.location.topLeftCorner, code.location.topRightCorner, "#FF3B58");
        this.drawLine(code.location.topRightCorner, code.location.bottomRightCorner, "#FF3B58");
        this.drawLine(code.location.bottomRightCorner, code.location.bottomLeftCorner, "#FF3B58");
        this.drawLine(code.location.bottomLeftCorner, code.location.topLeftCorner, "#FF3B58");
        // outputMessage.hidden = true;
        // outputData.parentElement.hidden = false;

        if (this.data.getValue() != code.data) {
          this.data.next(code.data);
        }
      } else {
        // outputMessage.hidden = false;
        // outputData.parentElement.hidden = true;
      }
    }
    requestAnimationFrame(() => this.tick());
  }
}
