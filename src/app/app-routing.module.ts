import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
  },
  {
    path: 'buyer',
    loadChildren: () =>
      import('../buyer/buyer.module').then((m) => m.BuyerModule),
  },
  {
    path: 'seller',
    loadChildren: () =>
      import('../seller/seller.module').then((m) => m.SellerModule),
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
