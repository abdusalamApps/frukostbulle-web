import {StoreModule} from '@ngrx/store';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuyerRoutingModule } from './buyer-routing.module';

import * as components from './components';

import { materialModules } from '../material-modules';

// Google maps
import {AgmCoreModule} from '@agm/core';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';



import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from 'src/environments/environment';
import {EffectsModule} from '@ngrx/effects';
import {effects, reducers} from '../buyer/state';
import {CalendarModule} from '@syncfusion/ej2-angular-calendars';
import {DeleteDialog} from "./components/shopping-cart/shopping-cart.component";


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
    DeleteDialog
  ],
    imports: [CommonModule,
        BuyerRoutingModule,
        StoreModule.forFeature('buyer', reducers),
        StoreDevtoolsModule.instrument({
            maxAge: 25,
            logOnly: environment.production,
        }),
        EffectsModule.forFeature(effects),
        ...materialModules,
        FormsModule, ReactiveFormsModule, AgmCoreModule, CalendarModule
    ],

})
export class BuyerModule {}
