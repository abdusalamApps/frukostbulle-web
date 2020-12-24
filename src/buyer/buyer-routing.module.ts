import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import * as components from './components';
import {AuthGuard} from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: components.RootComponent,
    children: [
      {
        path: 'profile',
        component: components.ProfileComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'profile-editor',
        component: components.ProfileEditorComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'confirmation-login',
        component: components.ConfirmationLoginComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'seller-details',
        component: components.SellerDetailsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'items',
        component: components.ItemsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'shopping-cart',
        component: components.ShoppingCartComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'order-no-login',
        component: components.OrderNoLoginComponent,
        canActivate: [AuthGuard]
      },
      {path: 'map',
        component: components.MapComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'order-login-or-not',
        component: components.OrderLoginOrNotComponent,
        canActivate: [AuthGuard]
      },
      {path: 'confirmation-no-login',
        component: components.ConfirmationNoLoginComponent,
        canActivate: [AuthGuard]
      },
      {path: 'order-history',
        component: components.OrderHistoryComponent,
        canActivate: [AuthGuard]
      }
    ],
  },
  {path: 'login', component: components.LoginComponent},
  {path: 'signup', component: components.SignupComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuyerRoutingModule {
}
