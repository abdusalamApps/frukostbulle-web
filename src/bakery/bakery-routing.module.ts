import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  OrderDetailsComponent,
  OrderHistoryComponent,
  OrdersComponent,
  LoginComponent,
  RootComponent
} from './components';

import * as Components from './components';
import * as fromGuards from './guards';

const routes: Routes = [
  {
    path: '',
    component: Components.RootComponent,
    children: [
      {path: 'order-details/:orderId', component: OrderDetailsComponent, canActivate: [fromGuards.AuthGuard],},
      {path: 'order-history', component: OrderHistoryComponent, canActivate: [fromGuards.AuthGuard],},
      {path: 'orders', component: OrdersComponent, canActivate: [fromGuards.AuthGuard],}
    ]},
  {path: 'login', component: LoginComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BakeryRoutingModule { }
