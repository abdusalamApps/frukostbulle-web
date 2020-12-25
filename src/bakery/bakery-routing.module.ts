import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {
  OrderDetailsComponent,
  OrderHistoryComponent,
  OrdersComponent,
  LoginComponent,
  RootComponent
} from './components';

import * as Components from '../bakery/components';
const routes: Routes = [
  {
    path: '',
    component: Components.RootComponent,
    children: [
      {path: 'bakery/order-details', component: OrderDetailsComponent},
      {path: 'bakery/order-history', component: OrderHistoryComponent},
      {path: 'bakery/orders', component: OrdersComponent}
    ]},
  {path: 'bakery/login', component: LoginComponent}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BakeryRoutingModule {}
