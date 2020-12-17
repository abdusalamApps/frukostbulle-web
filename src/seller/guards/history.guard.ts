import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import * as fromState from '../state';

@Injectable({
  providedIn: 'root'
})
export class HistoryGuard implements CanActivate {
  constructor(private store: Store<fromState.SellerState>) {
  }

  canActivate(): boolean {
    const sellerId = localStorage.getItem('currentUserId');
    if (sellerId) {
      this.store.dispatch(new fromState.LoadOrderHistory(parseInt(sellerId, 10)));
    }
    return true;
  }

}
