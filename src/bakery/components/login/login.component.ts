import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bakery-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  enteredPassword =  '';
  hide = true;
  title = 'Välkommen';
  email = '';

  constructor() {
  }

  ngOnInit(): void {
  }

  public login(): void {
  }


}
