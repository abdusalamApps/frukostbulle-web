import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellerRoutingModule } from './seller-routing.module';

// Components
import * as Components from './components';

// Material Modules
import { materialModules } from '../material-modules';

// Google maps
import { AgmCoreModule } from '@agm/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
  imports: [
    CommonModule,
    SellerRoutingModule,
    ...materialModules,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA5uM21fX0xEYTcqRKgvjwVFqBs1Ve9hAc',
      libraries: ['places', 'drawing', 'geometry'],
    }),
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class SellerModule {}
