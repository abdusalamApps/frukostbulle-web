import {StoreModule} from '@ngrx/store';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SellerRoutingModule} from './seller-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';

// Components
import {components} from './components';

// Material Modules
import {materialModules} from '../material-modules';

// Google maps
import {AgmCoreModule} from '@agm/core';

import * as fromGuards from './guards';

import {reducers, effects} from '../seller/state';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from 'src/environments/environment';
import {EffectsModule} from '@ngrx/effects';
import {commonModules} from '../common-modules';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {TokenInterceptor} from '../app/token.interceptor';
import {LogoutDialog} from './components/logout-dialog/logout-dialog.component';
import {DeleteDialog} from './components/item-editor/item-editor.component';
import {ProfileCardComponent} from './components/profile/profile-card/profile-card.component';
import { ChooseBakeryDialogComponent } from './components/choose-bakery-dialog/choose-bakery-dialog.component';

import {CalendarModule} from '@syncfusion/ej2-angular-calendars';
import { OrderDetailsCardComponent } from './components/order-details/order-details-card/order-details-card.component';
import { InsertItemDialogComponent } from './components/insert-item-dialog/insert-item-dialog.component';
import { MapComponent } from './components/seller-area/map/map.component';
import { MarkOrderDialog } from './components/mark-order/mark-order-dialog.component';

// @ts-ignore
@NgModule({
  declarations: [
    ...components,
    LogoutDialog,
    DeleteDialog,
    ProfileCardComponent,
    ChooseBakeryDialogComponent,
    OrderDetailsCardComponent,
    InsertItemDialogComponent,
    MapComponent,
    MarkOrderDialog,
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
    StoreModule.forFeature('seller', reducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forFeature(effects),
    ...commonModules,
    CalendarModule,
    FormsModule,
    NgxChartsModule,
  ],
  providers: [
    ...fromGuards.guards,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  exports: [
    ProfileCardComponent
  ]
})
export class SellerModule {
}
