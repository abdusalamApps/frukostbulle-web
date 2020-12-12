import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-item-editor',
  templateUrl: './item-editor.component.html',
  styleUrls: ['./item-editor.component.scss']
})
export class ItemEditorComponent implements OnInit {

  name = '';
  price = 0;
  imageSrc = 'assets/img/product-placeholder.png';

  nameControl = new FormControl();
  priceControl = new FormControl();

  file = new File(['nofing'], 'empty file');


  constructor(public location: Location,
              private _snackBar: MatSnackBar,) {
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

  ngOnInit(): void {
  }


  onSave() {

  }
}
