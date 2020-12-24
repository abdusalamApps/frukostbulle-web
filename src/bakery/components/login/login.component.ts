import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-bakery-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  enteredPassword =  '';
  hide = true;
  router: Router;
  title = 'Välkommen';
  email = '';

  constructor(router: Router,
              private aRoute: ActivatedRoute) {
    this.router = router;
  }

  ngOnInit(): void {
  }

  public login(): void {
    // log in if credentials are correct
  }


}
