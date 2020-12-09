import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuyerRoutingModule } from './buyer-routing.module';
import { LoginComponent } from './components/login/login.component';
import { MapComponent } from './components/map/map.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { ItemsComponent } from './components/items/items.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfileEditorComponent } from './components/profile-editor/profile-editor.component';
import { RootComponent } from './components/root/root.component';
import { SignupComponent } from './components/signup/signup.component';
import { ConfirmationLoginComponent } from './components/confirmation-login/confirmation-login.component';
import { ConfirmationNoLoginComponent } from './components/confirmation-no-login/confirmation-no-login.component';
import { OrderLoginOrNotComponent } from './components/order-login-or-not/order-login-or-not.component';
import { OrderNoLoginComponent } from './components/order-no-login/order-no-login.component';
import { SellerDetailsComponent } from './components/seller-details/seller-details.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';

@NgModule({
  declarations: [LoginComponent, MapComponent, OrderHistoryComponent, ItemsComponent, ProfileComponent, ProfileEditorComponent, RootComponent, SignupComponent, ConfirmationLoginComponent, ConfirmationNoLoginComponent, OrderLoginOrNotComponent, OrderNoLoginComponent, SellerDetailsComponent, ShoppingCartComponent],
  imports: [CommonModule, BuyerRoutingModule],
})
export class BuyerModule {}
