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

const routes: Routes = [
  {
    path: '',
    component: Components.RootComponent,
    children: [
      {path: 'order-details', component: OrderDetailsComponent},
      {path: 'order-history', component: OrderHistoryComponent},
      {path: 'orders', component: OrdersComponent}
    ]},
  {path: 'login', component: LoginComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BakeryRoutingModule { }
