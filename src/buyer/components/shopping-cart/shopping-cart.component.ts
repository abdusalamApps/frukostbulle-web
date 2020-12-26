import {Component, Inject, OnInit} from '@angular/core';
import {ShoppingCartItem} from '../../../models/shoppingCartItem';
import {Observable} from 'rxjs';
import {Order} from '../../../models/order.model';
import * as fromState from '../../state';
import {Store} from '@ngrx/store';
import {Item} from "../../../models/item.model";
import * as fromRoot from "../../../app/state";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  title = 'Varukorg';
  orders$ = new Observable<Order[]>();

  amount = 1;
  cartItems: { item: Item, count: number }[] = [];
  total = 0;

  deliveryDates = [];

  sellerDates: Date[] = [];
  public dateValue: Date = new Date();

  constructor(private store: Store<fromState.BuyerState>,
              private dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.parseCartItems();
  }

  parseCartItems(): void {
    if (JSON.parse(<string>localStorage.getItem('cart')) !== null) {
      this.cartItems = JSON.parse(<string>localStorage.getItem('cart'));
    }
    this.calculateTotal();
  }

  incrementAmount(itemId: number): void {
    this.findItem(itemId).count++;
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
    this.parseCartItems();
  }

  decrementAmount(itemId: number): void {
    let item = this.findItem(itemId);
    if (item.count > 1) {
      item.count--;
    }
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
    this.parseCartItems();
  }

  findItem(itemId: number): { item: Item, count: number } {
    let filter = this.cartItems.filter(e => {
      return e.item.itemId == itemId;
    });
    return filter[0];
  }

  onDelete(item: { item: Item, count: number }): void {
    this.dialog.open(DeleteDialog, {
      data: {
        item: item,
        cartItems: this.cartItems,
        component: this
      }
    })
    this.parseCartItems();
  }

  public setCartItems(cartItems: { item: Item, count: number }[]): void {
    this.cartItems = cartItems;
    this.calculateTotal();
  }

  calculateTotal(): void {
    this.total = 0;
    for (let item of this.cartItems) {
      this.total += item.item.price * item.count;
    }
  }

  onConfirm(): void {
  }

  disableDate(args: any) {
    if (!this.contains(args.date)) {
      args.isDisabled = true;
    }
  }

  private contains(date: Date): boolean {
    let formattedCalendarDate = JSON.stringify(date.toJSON()).split('T')[0].substring(1);
    for (let i = 0; i < this.sellerDates.length; i++) {
      if (formattedCalendarDate === this.sellerDates[i].toString()) {
        return true;
      }
    }
    return false;
  }

  public navigateBack(): void {
    this.store.dispatch(new fromRoot.Back());
  }
}

@Component({
  selector: 'app-shopping-cart',
  template: `<h2 mat-dialog-title>Ta bort {{data.item.item.itemName}}?</h2>
  <div mat-dialog-actions>
    <button mat-button (click)="onYesClick()">Ja</button>
    <button mat-button (click)="onNoClick()">Nej</button>
  </div>`,
  styleUrls: ['./shopping-cart.component.scss']
})
export class DeleteDialog {
  constructor(
    public dialogRef: MatDialogRef<DeleteDialog>,
    @Inject(MAT_DIALOG_DATA) public data: {
      item: { item: Item, count: number },
      cartItems: { item: Item, count: number }[],
      component: ShoppingCartComponent;
    }) {
  }

  onNoClick() {
    this.dialogRef.close();
  }

  onYesClick() {
    this.data.cartItems = this.data.cartItems.filter(e => e !== this.data.item);
    localStorage.setItem('cart', JSON.stringify(this.data.cartItems));
    this.data.component.setCartItems(this.data.cartItems);
    this.dialogRef.close();
  }

}
