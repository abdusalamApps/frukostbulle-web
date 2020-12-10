import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuyerRoutingModule } from './buyer-routing.module';

import * as components from './components';

import { materialModules } from './../material-modules';

@NgModule({
  declarations: [
    components.LoginComponent,
    components.MapComponent,
    components.OrderHistoryComponent,
    components.ItemsComponent,
    components.ProfileComponent,
    components.ProfileEditorComponent,
    components.RootComponent,
    components.SignupComponent,
    components.ConfirmationLoginComponent,
    components.ConfirmationNoLoginComponent,
    components.OrderLoginOrNotComponent,
    components.OrderNoLoginComponent,
    components.SellerDetailsComponent,
    components.ShoppingCartComponent,
  ],
  imports: [CommonModule, BuyerRoutingModule, ...materialModules],
})
export class BuyerModule {}
