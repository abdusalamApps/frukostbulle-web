import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormControl, Validators} from '@angular/forms';
import * as fromRoot from '../../../app/state';
import {Store} from '@ngrx/store';
import * as fromState from '../../state';
import {PermissionLevel, User} from '../../../models/user.model';
import {CitiesService} from '../../../seller/services/cities.service';
import {Subscription} from 'rxjs';
import {UsersService} from '../../../seller/services/users.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {

  title = 'Skapa profil';
  hide = true;

  enteredPassword = '';
  enteredPassword2 = '';

  isLinear = false;

  nameControl = new FormControl('', [
    Validators.minLength(2),
    Validators.required
  ]);
  emailControl = new FormControl('', [
    Validators.email,
    Validators.required
  ]);
  streetControl = new FormControl('', [
    Validators.minLength(5),
    Validators.required

  ]);
  cityControl = new FormControl('', [
    Validators.minLength(2),
    Validators.required

  ]);
  mobileControl = new FormControl('', [
    Validators.minLength(10),
    Validators.maxLength(10),
    Validators.required
  ]);

  userSubscription$ = new Subscription();
  cEmailSubscription = new Subscription();
  confirmSubscription$ = new Subscription();

  newUserId = -1;
  signupSuccess = false;
  code = -1;

  constructor(private store: Store<fromState.BuyerState>,
              private snackBar: MatSnackBar,
              private citiesService: CitiesService,
              private userService: UsersService
  ) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.userSubscription$.unsubscribe();
    this.cEmailSubscription.unsubscribe();
    this.confirmSubscription$.unsubscribe();
  }

  onCreate(): void {
    if (this.emailControl.hasError('email')
      || this.emailControl.hasError('required')
      || this.mobileControl.hasError('minlength')
      || this.mobileControl.hasError('maxlength')
      || this.mobileControl.hasError('required')
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
    } else if (this.enteredPassword.length < 8) {
      this.snackBar.open('Lösenord måste minst vara 8 karaktärer.', 'Ok', {
        duration: 2000,
      });

    } else if (this.enteredPassword !== this.enteredPassword2) {
      this.snackBar.open('Lösenorden matchar inte.', 'Ok', {
        duration: 2000,
      });
    } else {
      const newUser: User = {
        id: -1,
        name: this.nameControl.value,
        county: this.getCounty(this.cityControl.value),
        city: this.cityControl.value,
        address: `${this.streetControl.value}, ${this.cityControl}`,
        mobilenbr: this.mobileControl.value,
        email: this.emailControl.value,
        password: this.enteredPassword,
        permissionLevel: PermissionLevel.BUYER,
        reminder: false,
        associatedBakery: -1,
        associatedSeller: -1,
        active: false,
        availableDates: [],
        orderBuffer: -1,
        lasOrderDay: '',
        profilePictureUrl: ''
      };
      this.userSubscription$ = this.userService.createUser(newUser, []).subscribe(
        (res: any) => {
          this.newUserId = res;
          this.signupSuccess = true;
          this.cEmailSubscription = this.userService.sendConfirmationEmail(newUser.email).subscribe(
            (result: any) => {
              console.log(`createUser res: ${result}`);
            },
            (err: any) => {
              console.log(`send confirmation email failed ${JSON.stringify(err)}`);
            }
          );
        },
        (err: any) => {
          console.log(`createUser error: ${JSON.stringify(err)}`);
          this.snackBar.open(`Fel: ${err}`, 'Ok', {duration: 2000});
        }
      );
    }
  }

  public navigateBack(): void {
    this.store.dispatch(new fromRoot.Back());
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

  onConfirm(): void {
    this.confirmSubscription$ = this.userService
      .confirmAccount(this.emailControl.value, this.code).subscribe(
        res => console.log(`accountConfirm res: ${res}`),
        err => console.log(`accountConfirm error: ${JSON.stringify(err)}`)
      );
    // this.store.dispatch(new fromRoot.Back());

  }

}
