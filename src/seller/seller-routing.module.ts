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
        canActivate: [fromGuards.AuthGuard, fromGuards.ItemsGuard],
      },
      {
        path: 'orders', component: Components.WeekOrdersComponent,
        canActivate: [fromGuards.AuthGuard, fromGuards.OrdersGuard],
      },
      {
        path: 'orders/:orderId', component: Components.OrderDetailsComponent,
        canActivate: [fromGuards.AuthGuard],
      },
      {
        path: 'profile', component: Components.ProfileComponent,
        canActivate: [fromGuards.AuthGuard, fromGuards.ProfileGuard],
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
        canActivate: [fromGuards.AuthGuard, fromGuards.HistoryGuard],
      },
      {
        path: 'choose-days', component: Components.ChooseDaysComponent,
        canActivate: [fromGuards.AuthGuard, fromGuards.DatesGuard],
      },
      {
        path: 'send-to-bakery', component: Components.SendToBakeryComponent,
        canActivate: [fromGuards.AuthGuard],
      },
      {
        path: 'map', component: Components.SellerAreaComponent,
        canActivate: [fromGuards.AuthGuard, fromGuards.AreaGuard],
      },
      {
        path: 'items/:itemId', component: Components.ItemEditorComponent,
        canActivate: [fromGuards.AuthGuard],
      },
      {
        path: 'update-password',
        component: Components.UpdatePasswordComponent
      }
    ],
  },
  {path: 'signup', component: Components.SignupComponent},
  {
    path: 'choose-bakery', component: Components.ChooseBakeryComponent,
    canActivate: [fromGuards.AuthGuard],
  },
  {
    path: 'login', component: Components.LoginComponent
  },

];

// @ts-ignore
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SellerRoutingModule {
}
