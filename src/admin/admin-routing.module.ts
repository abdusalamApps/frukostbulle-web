import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  BakeriesComponent,
  CreateBakeryComponent,
  CreateSellerComponent,
  LoginComponent,
  ManageAccountComponent,
  ManageBakeryComponent,
  ManageBuyerComponent,
  ManageSellerComponent,
  SellersAndBuyersComponent
} from './components';

import * as Components from '../admin/components';

const routes: Routes = [
  {
    path: '',
    component: Components.RootComponent,
    children: [
      {path: 'bakeries', component: BakeriesComponent},
      {path: 'create-bakery', component: CreateBakeryComponent},
      {path: 'create-seller', component: CreateSellerComponent},
      {path: 'manage-account', component:  ManageAccountComponent},
      {path: 'manage-bakery/:bakeryId', component:  ManageBakeryComponent},
      {path: 'manage-buyer/:buyerId', component: ManageBuyerComponent},
      {path: 'manage-seller/:sellerId', component: ManageSellerComponent},
      {path: 'sellers-and-buyers', component: SellersAndBuyersComponent}
    ]},
  {path: 'login', component: LoginComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
