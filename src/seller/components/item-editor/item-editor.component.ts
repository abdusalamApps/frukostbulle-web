import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormControl, Validators} from '@angular/forms';
import {Item} from '../../../models/item.model';
import {Store} from '@ngrx/store';
import * as fromState from '../../state';
import * as fromRoot from '../../../app/state';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {User} from '../../../models/user.model';

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
    private snackBar: MatSnackBar,
    private store: Store<fromState.SellerState>,
    private rootStore: Store<fromRoot.State>,
    private dialog: MatDialog
  ) {
  }

  ngOnDestroy(): void {

  }

  ngOnInit(): void {
    this.itemObservable$ = this.store.select(fromState.getSelectedItem).pipe(
      tap((item: Item) => {
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

  chooseImage(event: any): void {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      [this.file] = event.target.files;
      reader.readAsDataURL(this.file);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
      };
    }
  }

  onSave(): void {
    if (this.name === '' || this.price < 0) {
      this.snackBar.open('Rätta felen!', 'Ok', {duration: 1000});
    } else {
      console.log(`onSave()@ItemEditor`);
      const currentEmail = localStorage.getItem('currentUserEmail');
      const currentUserId = localStorage.getItem('currentUserId');
      if (currentEmail && currentUserId) {
        const imageUrl = this.imageSrc === 'assets/img/product-placeholder.png' ? '' : this.imageSrc;
        const newItem = new Item(0, parseInt(currentUserId, 10), currentEmail, this.price, this.name, imageUrl);
        this.store.dispatch(new fromState.InsertItem(newItem));
      }
    }
  }

  // dispatches UpdateItem action when update button is clicked
  onUpdate(): void {
    if (this.name === '' || this.price < 0) {
      this.snackBar.open('Rätta felen!', 'Ok', {duration: 1000});
    } else {
      const currentEmail = localStorage.getItem('currentUserEmail');
      const currentUserId = localStorage.getItem('currentUserId');
      if (currentUserId && currentEmail) {
        // Dispatch UpdateItem only when currentEmail and currentUserId is available
        const imageUrl = this.imageSrc === 'assets/img/product-placeholder.png' ? '' : this.imageSrc;
        const newItem = new Item(this.itemId, parseInt(currentUserId, 10), currentEmail, this.price, this.name, imageUrl);
        this.store.dispatch(new fromState.UpdateItem(newItem));
      }
    }

  }

  onCancel(): void {
    this.rootStore.dispatch(new fromRoot.Back());
  }

  // opens a dialog to confirm or to cancel deleting the item
  // when delete button is clicked
  onDelete(): void {
    this.dialog.open(DeleteDialog, {
      width: '250px',
      data: {
        store: this.store,
        name: this.name,
        id: this.itemId
      }
    });
  }

}

// A dialog that opens to confirm or to cancel deleting the item
@Component({
  // tslint:disable-next-line:components-selector
  selector: 'delete-dialog',
  templateUrl: 'delete-dialog.html',
})
// tslint:disable-next-line:components-class-suffix
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
