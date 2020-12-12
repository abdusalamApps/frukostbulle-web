import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from 'src/models/item.model';
import {Store} from '@ngrx/store';
import * as fromState from '../../state';
import {tap} from 'rxjs/operators';
import {AuthResponse} from '../../../models/authResponse.model';
import * as fromRoot from 'src/app/state';

@Component({
  selector: 'app-my-items',
  templateUrl: './my-items.component.html',
  styleUrls: ['./my-items.component.scss'],
})

export class MyItemsComponent implements OnInit {
  title = 'Mina frallor';

  items$: Observable<Item[]> = new Observable<[]>();
  loading$: Observable<boolean> = new Observable<boolean>();
  loaded$: Observable<boolean> = new Observable<boolean>();

  email$: Observable<AuthResponse>= new Observable<AuthResponse>();

  constructor(private store: Store<fromState.SellerState>,
              private rootStore: Store<fromRoot.State>) {}

  ngOnInit(): void {
    this.store.select(fromState.getAuthEmail).subscribe(
      email => {
/*
        let respString= JSON.stringify(resp);
        console.log(respString.search("user"));
        let userString = respString.substring(respString.search("user"));
        console.log(`userString: ${userString}`)
        let userJSONObject = JSON.parse( '{"' + userString)
        let email = userJSONObject.Username;
        console.log(`email: ${email}`)
        console.log(JSON.parse(JSON.stringify(resp)))
*/
        console.log(`email in subscribe ${email}`)
        this.store.dispatch(new fromState.LoadItems(email));
      }
    );
/*
    console.log('email in my-items.comp: ' + this.email);
    this.store.dispatch(new fromState.LoadItems(this.email));
*/
    this.items$ = this.store.select(fromState.getAllItems);
    this.loading$ = this.store.select(fromState.getItemsLoading);
    this.loaded$ = this.store.select(fromState.getItemsLoaded);
  }
}
