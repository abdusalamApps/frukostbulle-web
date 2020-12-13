import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormControl, Validators} from '@angular/forms';
import {Item} from '../../../models/item.model';
import {Store} from '@ngrx/store';
import * as fromState from '../../state';
import * as fromRoot from '../../../app/state';
import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {InsertItem} from '../../../models/insertItem.model';
import * as urls from '../../../urls';
import {HttpClient} from '@angular/common/http';
import {log} from 'util';
import {ItemsService} from '../../services/items.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-item-editor',
  templateUrl: './item-editor.component.html',
  styleUrls: ['./item-editor.component.scss']
})
export class ItemEditorComponent implements OnInit, OnDestroy {

  itemObservable$: Observable<Item> = new Observable<Item>();
  item: Item | null = null;

  title = 'Ny bulle';
  name = '';
  price = -1;
  imageSrc = 'assets/img/product-placeholder.png';

  itemId = -1;

  nameControl = new FormControl(Validators.name, Validators.required);
  priceControl = new FormControl(Validators.required);

  file = new File(['nofing'], 'empty file');

  sellerEmail = '';

  constructor(
    private _snackBar: MatSnackBar,
    private store: Store<fromState.SellerState>,
    private rootStore: Store<fromRoot.State>,
    private dialog: MatDialog
  ) {
  }

  ngOnDestroy(): void {

  }

  ngOnInit(): void {
    this.itemObservable$ = this.store.select(fromState.getSelectedItem).pipe(
      tap((item) => {
        if (item) {
          console.log('item not null');
          this.title = 'Redigera bulle';
          this.name = item.itemName;
          this.price = item.price;
          this.imageSrc = item.imageUrl ? item.imageUrl : 'assets/img/product-placeholder.png';
          this.itemId = item.itemId;
        }
      })
    );
  }

  chooseImage(event: any) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      [this.file] = event.target.files;
      reader.readAsDataURL(this.file);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
      };
    }
  }

  onSave() {
    if (this.name === '' || this.price < 0) {
      this._snackBar.open('Rätta felen!', 'Ok', {duration: 1000});
    } else {

      console.log(`onSave()@ItemEditor`);
      this.store.select(fromState.getCurrentUser).subscribe(
        currentUser => {
          let imageUrl = this.imageSrc === 'assets/img/product-placeholder.png' ? '' : this.imageSrc;
          if (currentUser) {
            let newItem = new Item(0, currentUser.id, currentUser.email, this.price, this.name, imageUrl);
            this.store.dispatch(new fromState.InsertItem(newItem));
          }
        }
      );
    }
  }

  onUpdate() {
    if (this.name === '' || this.price < 0) {
      this._snackBar.open('Rätta felen!', 'Ok', {duration: 1000});
    } else {

      this.store.select(fromState.getCurrentUser).subscribe(
        currentUser => {
          let imageUrl = this.imageSrc === 'assets/img/product-placeholder.png' ? '' : this.imageSrc;
          if (currentUser) {
            let newItem = new Item(this.itemId, currentUser.id, currentUser.email, this.price, this.name, imageUrl);
            this.store.dispatch(new fromState.UpdateItem(newItem));
          }
        }
      );
    }

  }

  onCancel() {
    this.rootStore.dispatch(new fromRoot.Back());
  }

  onDelete() {
    const dialogRef = this.dialog.open(DeleteDialog, {
      width: '250px',
      data: {
        store: this.store,
        name: this.name,
        id: this.itemId
      }
    });
  }

}

@Component({
  selector: 'delete-dialog',
  templateUrl: 'delete-dialog.html',
})
export class DeleteDialog {

  constructor(
    public dialogRef: MatDialogRef<DeleteDialog>,
    @Inject(MAT_DIALOG_DATA) public data: { store: Store, name: string, id: number }) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick(): void {
    this.data.store.dispatch(new fromState.DeleteItem(this.data.id));
  }

}
