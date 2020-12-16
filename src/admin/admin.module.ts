import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { components } from './components';
import {materialModules} from '../material-modules';

@NgModule({
  declarations: [
    ...components
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ...materialModules
  ]
})
export class AdminModule { }
