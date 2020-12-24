import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import * as components from './components';

const routes: Routes = [
  {
    path: '',
    component: components.RootComponent,
    children: [
      {path: 'profile', component: components.ProfileComponent},
      {path: 'profile-editor', component: components.ProfileEditorComponent},
      {path: 'confirmation-login', component: components.ConfirmationLoginComponent},
      {path: 'seller-details', component: components.SellerDetailsComponent},
      {path: 'items', component: components.ItemsComponent},
      {path: 'shopping-cart', component: components.ShoppingCartComponent},
      {path: 'order-no-login', component: components.OrderNoLoginComponent},
      {path: '', component: components.MapComponent},
      {path: 'order-login-or-not', component: components.OrderLoginOrNotComponent},
      {path: 'confirmation-no-login', component: components.ConfirmationNoLoginComponent},
      {path: 'order-history', component: components.OrderHistoryComponent}
    ],
  },
  {path: 'login', component: components.LoginComponent},
  {path: 'signup', component: components.SignupComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuyerRoutingModule { }
