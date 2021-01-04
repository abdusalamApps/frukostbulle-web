import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import * as fromRoot from '../../../app/state';
import {Store} from '@ngrx/store';
import * as fromState from '../../../admin/state';
import {FormControl, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {PermissionLevel, User} from '../../../models/user.model';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Bakery} from '../../../models/bakery.model';
import {CitiesService} from '../../../seller/services/cities.service';
import {UsersService} from '../../../seller/services/users.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Item} from '../../../models/item.model';
import {ShoppingCartComponent} from '../../../buyer/components';

@Component({
  selector: 'app-create-bakery',
  templateUrl: './create-bakery.component.html',
  styleUrls: ['./create-bakery.component.scss']
})
export class CreateBakeryComponent implements OnInit, OnDestroy {
  title = 'Skapa bageriprofil';

  email = '';
  name = '';
  mobile = '';
  newBakery: User | undefined;
  nameControl = new FormControl('', [
    Validators.required,
    Validators.minLength(2)
  ]);
  emailControl = new FormControl('', [
    Validators.email,
    Validators.required,
  ]);
  mobileControl = new FormControl('', [
    Validators.minLength(10),
    Validators.maxLength(10),
  ]);
  streetControl = new FormControl('', [
    Validators.minLength(5),
    Validators.required

  ]);
  cityControl = new FormControl('', [
    Validators.minLength(2),
    Validators.required

  ]);
  userSubscription$ = new Subscription();
  cEmailSubscription = new Subscription();
  confirmSubscription$ = new Subscription();

  signupSuccess = false;
  code = -1;
  newBakeryId = -1;

  constructor(private snackBar: MatSnackBar,
              private store: Store<fromState.AdminState>,
              private citiesService: CitiesService,
              private userService: UsersService,
              private dialog: MatDialog) {
  }

  ngOnDestroy(): void {
    this.userSubscription$.unsubscribe();
    this.cEmailSubscription.unsubscribe();
    this.confirmSubscription$.unsubscribe();
  }

  ngOnInit(): void {
  }

  public navigateBack(): void {
    this.store.dispatch(new fromRoot.Back());
  }

  public onCreateBakery(): void {
    if (this.emailControl.hasError('required')
      || this.emailControl.hasError('email')
      || this.mobileControl.hasError('required')
      || this.mobileControl.hasError('minlength')
      || this.mobileControl.hasError('maxlength')
      || this.nameControl.hasError('required')
      || this.nameControl.hasError('minlength')
      || this.streetControl.hasError('minlength')
      || this.streetControl.hasError('required')
      || this.cityControl.hasError('minlength')
      || this.cityControl.hasError('required')
    ) {
      this.snackBar.open('Rätta felen.', 'Ok', {
        duration: 2000,
      });
    } else {
      this.dialog.open(AddBakeryDialog, {
        data: {
          component: this
        }
      })
    }
  }

  public createBakery(): void {
    const newBakery: User = {
      id: -1,
      name: this.nameControl.value,
      county: this.getCounty(this.cityControl.value),
      city: this.cityControl.value,
      address: this.streetControl.value,
      mobilenbr: this.mobileControl.value,
      email: this.emailControl.value,
      password: '',
      permissionLevel: PermissionLevel.BAKERY,
      reminder: false,
      associatedBakery: -1,
      associatedSeller: -1,
      active: true,
      availableDates: [],
      orderBuffer: -1,
      lasOrderDay: '',
      profilePictureUrl: ''
    };
    this.userSubscription$ = this.userService.createUserNoPass(newBakery, []).subscribe(
      res => {
        this.newBakeryId = res;
        this.signupSuccess = true;
        this.cEmailSubscription = this.userService.sendConfirmationEmail(newBakery.email).subscribe(
          result => {
            this.store.dispatch(new fromRoot.Go({path: ['/admin/bakeries']}));
            console.log(`createUser res: ${result}`);
          },
          err => {
            console.log(`send confirmation email failed ${JSON.stringify(err)}`);
          }
        );
      },
      err => {
        console.log(`createUser error: ${err}`);
        this.snackBar.open(`Fel: ${err}`, 'Ok', {duration: 2000});
      }
    );

  }

  getCounty(city: string): string {
    const counties = this.citiesService.getCounties();
    for (const county of counties) {
      const cities = this.citiesService.getCitiesByCounty(county);
      for (const ci of cities) {
        if (ci === city) {
          return county;
        }
      }
    }
    return '';
  }
}

@Component({
  selector: 'app-create-bakery',
  template: `<h2 mat-dialog-title>Är du säker?</h2>
  <div mat-dialog-actions>
    <button mat-button (click)="onYesClick()">Ja</button>
    <button mat-button (click)="onNoClick()">Nej</button>
  </div>`,
  styleUrls: ['./create-bakery.component.scss']
})

export class AddBakeryDialog {
  constructor(
    public dialogRef: MatDialogRef<AddBakeryDialog>,
    @Inject(MAT_DIALOG_DATA) public data: {
      component: CreateBakeryComponent
    }) {
  }

  onNoClick() {
    this.dialogRef.close();
  }

  onYesClick() {
    this.data.component.createBakery();
    this.dialogRef.close();
  }
}
