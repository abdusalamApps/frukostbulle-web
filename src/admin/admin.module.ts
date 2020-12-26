import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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

@NgModule({
  declarations: [
    ...components,
    AddBakeryDialog
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
  ]
})
export class AdminModule { }
