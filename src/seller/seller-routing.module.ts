import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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
      { path: 'items/new', component: Components.ItemEditorComponent },
      {
        path: 'items',
        component: Components.MyItemsComponent,
        canActivate: [fromGuards.AuthGuard],
      },
      { path: 'order-details', component: Components.OrderDetailsComponent },
      { path: 'week-orders', component: Components.WeekOrdersComponent },
      { path: 'profile', component: Components.ProfileComponent },
      { path: 'notifications', component: Components.NotificationsComponent },
      { path: 'profile-editor', component: Components.ProfileEditorComponent },
      { path: 'order-history', component: Components.HistoryComponent },
      { path: 'choos-days', component: Components.ChooseDaysComponent },
      { path: 'send-to-bakery', component: Components.SendToBakeryComponent },
      { path: 'map', component: Components.MapComponent },
      { path: 'items/:itemId', component: Components.ItemEditorComponent },

    ],
  },
  { path: 'signup', component: Components.SignupComponent },
  { path: 'choose-bakery', component: Components.ChooseBakeryComponent },
  { path: 'login', component: Components.LoginComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SellerRoutingModule {}
