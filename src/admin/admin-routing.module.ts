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
import * as fromGuards from './guards';

const routes: Routes = [
  {
    path: '',
    component: Components.RootComponent,
    children: [
      {path: 'bakeries', component: BakeriesComponent, canActivate: [fromGuards.AuthGuard],},
      {path: 'create-bakery', component: CreateBakeryComponent, canActivate: [fromGuards.AuthGuard],},
      {path: 'create-seller', component: CreateSellerComponent, canActivate: [fromGuards.AuthGuard],},
      {path: 'manage-account', component:  ManageAccountComponent, canActivate: [fromGuards.AuthGuard],},
      {path: 'manage-bakery/:bakeryId', component:  ManageBakeryComponent, canActivate: [fromGuards.AuthGuard],},
      {path: 'manage-buyer/:buyerId', component: ManageBuyerComponent, canActivate: [fromGuards.AuthGuard],},
      {path: 'manage-seller/:sellerId', component: ManageSellerComponent, canActivate: [fromGuards.AuthGuard],},
      {path: 'sellers-and-buyers', component: SellersAndBuyersComponent, canActivate: [fromGuards.AuthGuard],}
    ]},
  {path: 'login', component: LoginComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
