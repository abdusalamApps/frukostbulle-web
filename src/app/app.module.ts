import { materialModules } from './../material-modules';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
  StoreRouterConnectingModule,
  RouterStateSerializer,
} from '@ngrx/router-store';

// Components
import { LandingComponent } from './components/landing/landing.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/root/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgmCoreModule } from '@agm/core';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { reducers, CustomSerializer } from './state';
import { effects } from './state/effects/index';
import { commonModules } from '../common-modules';

import { AuthModule } from '../auth/auth.module';

@NgModule({
  declarations: [AppComponent, LandingComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA5uM21fX0xEYTcqRKgvjwVFqBs1Ve9hAc',
      libraries: ['places', 'drawing', 'geometry'],
    }),
    StoreModule.forRoot(reducers, {}),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot(effects),
    StoreRouterConnectingModule.forRoot(),
    ...materialModules,
    ...commonModules,
    AuthModule,
  ],
  providers: [{ provide: RouterStateSerializer, useClass: CustomSerializer }],
  bootstrap: [AppComponent],
})
export class AppModule {}
