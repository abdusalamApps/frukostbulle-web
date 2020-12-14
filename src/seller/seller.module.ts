import {StoreModule} from '@ngrx/store';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SellerRoutingModule} from './seller-routing.module';

// Components
import * as Components from './components';

// Material Modules
import {materialModules} from '../material-modules';

// Google maps
import {AgmCoreModule} from '@agm/core';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';

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
    Components.UpdatePasswordComponent,
    LogoutDialog,
    DeleteDialog,
    ProfileCardComponent,
    ChooseBakeryDialogComponent,
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
    ...commonModules
  ],
  providers: [
    ...fromGuards.guards,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
})
export class SellerModule {
}
