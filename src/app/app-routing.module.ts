import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './components/index/index.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { QrScanComponent } from './components/qr-scan/qr-scan.component';
import { AuthGuard } from './guards/auth.guard';
import { HighscoreComponent } from './components/highscore/highscore.component';
import { ReceiptComponent } from './components/receipt/receipt.component';
import { TrophiesComponent } from './components/trophies/trophies.component';
import { ReceiptInfoComponent } from './components/receipt-info/receipt-info.component';

const routes: Routes = [
  { path: '', redirectTo: '/profile', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'scan', component: QrScanComponent, canActivate: [AuthGuard] },
  { path: 'trophies', component: TrophiesComponent, canActivate: [AuthGuard] },
  {
    path: 'highscore',
    component: HighscoreComponent,
    canActivate: [AuthGuard]
  },
  { path: 'receipt/:id', component: ReceiptComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
