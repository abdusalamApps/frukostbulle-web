import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as fromGuards from './guards';

import { AdminRoutingModule } from './admin-routing.module';
import {components} from './components';
import {materialModules} from '../material-modules';
import {commonModules} from '../common-modules';
import {StoreModule} from '@ngrx/store';
import {effects, reducers} from '../admin/state';
import {EffectsModule} from '@ngrx/effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {AddBakeryDialog} from './components/create-bakery/create-bakery.component';
import {DeleteDialog} from './components/manage-seller/manage-seller.component';
import {DeleteBuyerDialog} from './components/manage-buyer/manage-buyer.component';
import {DeleteBakeryDialog} from './components/manage-bakery/manage-bakery.component';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {TokenInterceptor} from '../app/token.interceptor';

@NgModule({
  declarations: [
    ...components,
    AddBakeryDialog,
    DeleteDialog,
    DeleteBuyerDialog,
    DeleteBakeryDialog
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ...materialModules,
    ...commonModules,
    StoreModule.forFeature('admin', reducers),
    EffectsModule.forFeature(effects),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
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
export class AdminModule { }
