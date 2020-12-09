import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellerRoutingModule } from './seller-routing.module';
import * as Components from './components';
import { MaterialModules } from '../material-modules';

@NgModule({
  declarations: [
    Components.ItemEditorComponent,
    Components.ChooseBakeryComponent,
    Components.SignupComponent,
    Components.ChooseDaysComponent,
    Components.MapComponent,
    Components.MyItemsComponent,
    Components.NotificationsComponent,
    Components.OrderDetailsComponent,
    Components.HistoryComponent,
    Components.ProfileComponent,
    Components.ProfileEditorComponent,
    Components.RootComponent,
    Components.SendToBakeryComponent,
    Components.LoginComponent,
    Components.WeekOrdersComponent,
  ],
  imports: [CommonModule, SellerRoutingModule, ...MaterialModules],
})
export class SellerModule {}
