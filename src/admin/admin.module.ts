import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import {components} from './components';
import {materialModules} from '../material-modules';
import {commonModules} from '../common-modules';

@NgModule({
  declarations: [
    ...components,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ...materialModules,
    ...commonModules
  ]
})
export class AdminModule { }
