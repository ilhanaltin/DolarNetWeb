import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'login-state-profile-box',
  templateUrl: './login-state-profile-box.component.html',
  styleUrls: ['./login-state-profile-box.component.css']
})
export class LoginStateProfileBoxComponent implements OnInit {

  constructor(private _authenticationService: AuthenticationService) { }

  ngOnInit() {
  }

}
