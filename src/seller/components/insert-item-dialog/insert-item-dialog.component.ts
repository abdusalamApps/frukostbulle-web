import {Component, Inject, OnInit} from '@angular/core';
import * as itemActions from '../../state/actions/items.action';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Store} from '@ngrx/store';
import {Item} from '../../../models/item.model';

@Component({
  selector: 'app-insert-item-dialog',
  templateUrl: './insert-item-dialog.component.html',
  styleUrls: ['./insert-item-dialog.component.scss']
})
export class InsertItemDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<InsertItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      store: Store,
      item: Item
    }) {
  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.data.store.dispatch(new itemActions.InsertItemCancel());
    this.dialogRef.close();
  }

  onYesClick(): void {
    this.data.store.dispatch(new itemActions.InsertItemConfirm(
      this.data.item));
    this.dialogRef.close();
  }

}
