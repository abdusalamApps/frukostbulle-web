import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import * as fromState from '../state';
import {Store} from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class AreaGuard implements CanActivate {
  constructor(private store: Store<fromState.SellerState>) {
  }

  canActivate(): boolean {
    const userId = localStorage.getItem('currentUserId');
    if (userId) {
      this.store.dispatch(new fromState.LoadCurrentUserArea(parseInt(userId, 10)));
    }

    return true;
  }

}
