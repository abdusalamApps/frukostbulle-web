import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';

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
    path: 'auth',
    loadChildren: () => import('../auth/auth.module').then((m) => m.AuthModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
