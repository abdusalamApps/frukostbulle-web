import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SellerRoutingModule } from './seller-routing.module';
import { ItemEditorComponent } from './components/item-editor/item-editor.component';
import { ChooseBakeryComponent } from './components/choose-bakery/choose-bakery.component';
import { SignupComponent } from './components/signup/signup.component';
import { ChooseDaysComponent } from './components/choose-days/choose-days.component';
import { MapComponent } from './components/map/map.component';
import { MyItemsComponent } from './components/my-items/my-items.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { HistoryComponent } from './components/history/history.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfileEditorComponent } from './components/profile-editor/profile-editor.component';
import { RootComponent } from './components/root/root.component';
import { SendToBakeryComponent } from './components/send-to-bakery/send-to-bakery.component';
import { LoginComponent } from './components/login/login.component';
import { WeekOrdersComponent } from './components/week-orders/week-orders.component';


@NgModule({
  declarations: [ItemEditorComponent, ChooseBakeryComponent, SignupComponent, ChooseDaysComponent, MapComponent, MyItemsComponent, NotificationsComponent, OrderDetailsComponent, HistoryComponent, ProfileComponent, ProfileEditorComponent, RootComponent, SendToBakeryComponent, LoginComponent, WeekOrdersComponent],
  imports: [
    CommonModule,
    SellerRoutingModule
  ]
})
export class SellerModule { }
