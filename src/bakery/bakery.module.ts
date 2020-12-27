import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BakeryRoutingModule } from './bakery-routing.module';
import {materialModules} from '../material-modules';
import {commonModules} from '../common-modules';
import {components} from './components';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {StoreModule} from '@ngrx/store';
import {reducers, effects} from '../bakery/state';
import {EffectsModule} from '@ngrx/effects';
import * as fromGuards from './guards';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {TokenInterceptor} from '../app/token.interceptor';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import { OrderCardComponent } from './components/order-details/order-card/order-card.component';

@NgModule({
  declarations: [
    ...components,
    OrderCardComponent,
  ],
  imports: [
    CommonModule,
    BakeryRoutingModule,
    ...materialModules,
    ...commonModules,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature('bakery', reducers),
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
export class BakeryModule { }
