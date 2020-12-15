import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable, of} from 'rxjs';
import {Store} from '@ngrx/store';
import * as fromState from '../state';
import {catchError, filter, switchMap, take, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ItemsGuard implements CanActivate {


  constructor(private store: Store<fromState.SellerState>) {
  }

  canActivate(): Observable<boolean> {
    let sellerId: string = '';
    let fromStorage = localStorage.getItem('currentUserId');
    if (fromStorage) {
      sellerId = fromStorage;
    }
    return this.checkStore(parseInt(sellerId)).pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  checkStore(sellerId: number): Observable<boolean> {
    return this.store.select(fromState.getItemsLoaded).pipe(
      tap((loaded) => {
        this.store.dispatch(new fromState.LoadItems(sellerId));

      }),
      filter(loaded => loaded),
      take(1)
    );
  }

}
