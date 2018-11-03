import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HighlightJsModule } from 'ngx-highlight-js';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './components/index/index.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { ProfileComponent } from './components/profile/profile.component';
import { QrScanComponent } from './components/qr-scan/qr-scan.component';
import { HighscoreComponent } from './components/highscore/highscore.component';
import { SafePipe } from './pipes/safe.pipe';
import { ReceiptComponent } from './components/receipt/receipt.component';
import { ProgressBarModule } from 'angular-progress-bar';
import { ReceiptInfoComponent } from './components/receipt-info/receipt-info.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    NavigationComponent,
    FooterComponent,
    LoginComponent,
    ProfileComponent,
    QrScanComponent,
    SafePipe,
    QrScanComponent,
    HighscoreComponent,
    ReceiptComponent,
    ReceiptInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HighlightJsModule,
    FormsModule,
    ProgressBarModule,

    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
