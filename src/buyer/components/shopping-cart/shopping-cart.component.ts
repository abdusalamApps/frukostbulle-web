import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {Order} from '../../../models/order.model';
import * as fromState from '../../state';
import {Store} from '@ngrx/store';
import {Item} from "../../../models/item.model";
import * as fromRoot from "../../../app/state";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {tap} from "rxjs/operators";
import {User} from "../../../models/user.model";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit, OnDestroy {
  title = 'Varukorg';

  cartItems: { item: Item, amount: number }[] = [];
  total = 0;

  sellerDates: Date[] = [];

  // @ts-ignore
  public selectedDate: Date;
  selectedTime = 7;
  selectedDeliveryMethod = 0;

  seller$ = new Observable<User | null>();
  currentUser$ = new Observable();
  seller: User | null = null;

  constructor(private store: Store<fromState.BuyerState>,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.seller$ = this.store.select(fromState.getCurrentAssociatedSeller).pipe(
      tap(user => {
        if (user) {
          this.sellerDates = user.availableDates;
          this.seller = user;
        }
      })
    );
    this.currentUser$ = this.store.select(fromState.getCurrentUser);

    this.parseCartItems();
  }

  ngOnDestroy(): void {
  }

  public parseCartItems(): void {
    if (JSON.parse(<string>localStorage.getItem('cart')) !== null) {
      this.cartItems = JSON.parse(<string>localStorage.getItem('cart'));
    }
    this.calculateTotal();
  }

  incrementAmount(itemId: number): void {
    this.findItem(itemId).amount++;
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
    this.parseCartItems();
  }

  decrementAmount(itemId: number): void {
    let item = this.findItem(itemId);
    if (item.amount > 1) {
      item.amount--;
    }
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
    this.parseCartItems();
  }

  findItem(itemId: number): { item: Item, amount: number } {
    let filter = this.cartItems.filter(e => {
      return e.item.itemId == itemId;
    });
    return filter[0];
  }

  onDelete(item: { item: Item, amount: number }): void {
    this.dialog.open(DeleteDialog, {
      data: {
        item,
        cartItems: this.cartItems,
        component: this
      }
    })
    this.parseCartItems();
  }

  calculateTotal(): void {
    this.total = 0;
    for (let item of this.cartItems) {
      this.total += item.item.price * item.amount;
    }
  }

  changeTime(time: number): void {
    this.selectedTime = time;
    console.log(`changeTime() ${this.selectedTime}`);

  }

  changeDeliveryMethod(method: number): void {
    this.selectedDeliveryMethod = method;
    console.log(`changeDeliveryMethod() ${this.selectedDeliveryMethod}`);

  }

  onConfirm(currentUser: User): void {
    if (this.seller) {
      let newOrder: Order = {
        id: -1,
        sellerId: this.seller.id,
        buyerId: currentUser.id,
        bakeryId: this.seller.associatedBakery,
        sellerName: this.seller.name,
        buyerName: currentUser.name,
        bakeryName: '',
        deliveryMethod: this.selectedDeliveryMethod != 0,
        deliveryTime: this.selectedTime,
        deliveryDate: JSON.stringify(this.selectedDate.toJSON()).split('T')[0].substring(1),
        handled: false,
        paid: false,
        delivered: false,
        fake: false,
        content: this.cartItems
      };
      console.log(`onConfirm() order: ${JSON.stringify(newOrder)}`);
      this.store.dispatch(new fromState.InsertOrder(newOrder));
    }
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
    this.data.component.parseCartItems();
    this.dialogRef.close();
  }

}
