import {LoginEffect} from './login.effect';
import {CurrentUserEffect} from './currentUser.effect';
import {UserEffect} from './user.effect';


export const effects: any[] = [
  LoginEffect,
  CurrentUserEffect,
  UserEffect
];


export * from './login.effect';
export * from './currentUser.effect';
export * from './user.effect';


