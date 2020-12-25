import {LoginEffects} from './login.effect';
import {LoadUsersEffect} from './loadUsers.effect';

export const effects: any[] = [
  LoginEffects,
  LoadUsersEffect,
];

export * from './login.effect';
export * from './loadUsers.effect';


