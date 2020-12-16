import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  router: Router;

  title = 'Admin login';
  email = '';
  enteredPassword = '';
  hide = true;

  constructor(router: Router) {
    this.router = router;

  }

  ngOnInit(): void {
  }

  public login(): void {
    // log in if credentials are correct
    if (this.checkCred()) {
      this.router.navigate(['/sellers-and-buyers']);
    }
  }

  public checkCred(): boolean {
    return true;
  }

}
