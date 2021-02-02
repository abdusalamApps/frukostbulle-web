import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import * as fromState from '../state';
import {Store} from '@ngrx/store';
import {LoadSelectedSeller} from '../state';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartGuard implements CanActivate {
  constructor(private store: Store<fromState.BuyerState>) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let sState = localStorage.getItem('state');
    if (sState !== null) {
      let id = JSON.parse(sState).buyer.currentUser.currentUser.associatedSeller;
      console.log(`userid@ShoppingCartGuard ${id}`);
      this.store.dispatch(new LoadSelectedSeller(id));
    }
    return true;
  }

}
