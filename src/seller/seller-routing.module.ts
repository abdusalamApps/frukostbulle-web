import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import * as Components from './components';
import * as fromGuards from './guards';

const routes: Routes = [
  {
    path: '',
    component: Components.RootComponent,
    children: [
      {
        path: '',
        component: Components.MyItemsComponent,
        canActivate: [fromGuards.AuthGuard],
      },
      {path: 'items/new', component: Components.ItemEditorComponent},
      {
        path: 'items',
        component: Components.MyItemsComponent,
        canActivate: [fromGuards.AuthGuard],
      },
      {
        path: 'order-details', component: Components.OrderDetailsComponent,
        canActivate: [fromGuards.AuthGuard],
      },
      {
        path: 'week-orders', component: Components.WeekOrdersComponent,
        canActivate: [fromGuards.AuthGuard],
      },
      {
        path: 'profile', component: Components.ProfileComponent,
        canActivate: [fromGuards.AuthGuard],
      },
      {
        path: 'notifications', component: Components.NotificationsComponent,
        canActivate: [fromGuards.AuthGuard],
      },
      {
        path: 'profile-editor', component: Components.ProfileEditorComponent,
        canActivate: [fromGuards.AuthGuard],
      },
      {
        path: 'order-history', component: Components.HistoryComponent,
        canActivate: [fromGuards.AuthGuard],
      },
      {
        path: 'choose-days', component: Components.ChooseDaysComponent,
        canActivate: [fromGuards.AuthGuard],
      },
      {
        path: 'send-to-bakery', component: Components.SendToBakeryComponent,
        canActivate: [fromGuards.AuthGuard],
      },
      {
        path: 'map', component: Components.MapComponent,
        canActivate: [fromGuards.AuthGuard],
      },
      {
        path: 'items/:itemId', component: Components.ItemEditorComponent,
        canActivate: [fromGuards.AuthGuard],
      },
      {path: 'update-password', component: Components.UpdatePasswordComponent}

    ],
  },
  {path: 'signup', component: Components.SignupComponent},
  {
    path: 'choose-bakery', component: Components.ChooseBakeryComponent,
    canActivate: [fromGuards.AuthGuard],
  },
  {path: 'login', component: Components.LoginComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SellerRoutingModule {
}
