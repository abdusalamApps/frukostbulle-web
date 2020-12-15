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

  sellerId = -1;

  constructor(private store: Store<fromState.SellerState>) {
    this.getSellerId();
  }

  canActivate(): Observable<boolean> {
    let userId: string = '';
    let fromStorage = localStorage.getItem('currentUserId');
    if (fromStorage) {
      userId = fromStorage;
    }
    return this.checkStore(parseInt(userId)).pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  checkStore(sellerId: number): Observable<boolean> {
    return this.store.select(fromState.getItemsLoaded).pipe(
      tap((loaded) => {
        if (!loaded) {
          this.store.dispatch(new fromState.LoadItems(sellerId));
        }
      }),
      filter(loaded => loaded),
      take(1)
    );
  }

  getSellerId(): Observable<number> {
    return this.store.select(fromState.getCurrentUserId).pipe(
      switchMap((id) => {
          if (id) {
            this.sellerId = id;
            console.log(`sellerId@getSellerId()@OrdersGuard ${id}`);
            return of(id);
          }
          return of(-1);
        }
      ),
      catchError((error) => {
        console.log(`error@getSellerId()@OrdersGuard ${error}`);
        return of(error);
      }),
      take(1)
    );
  }

}
