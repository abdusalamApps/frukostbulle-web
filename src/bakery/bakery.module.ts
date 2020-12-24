import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BakeryRoutingModule } from './bakery-routing.module';
import {materialModules} from '../material-modules';
import {commonModules} from '../common-modules';
import {components} from './components';

@NgModule({
  declarations: [
    ...components,
  ],
  imports: [
    CommonModule,
    BakeryRoutingModule,
    ...materialModules,
    ...commonModules
  ]
})
export class AdminModule { }
