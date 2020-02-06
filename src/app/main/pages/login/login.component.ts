import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { GlobalConstants } from '../../models/constants/GlobalConstants';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  invalidLogin: boolean;

  constructor(private _authenticationService: AuthenticationService,    
              private _router: Router,
              private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this._formBuilder.group({
      email   : ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
  });
  }

  login(credentials) : void {
    this._authenticationService.login(credentials)
        .subscribe(result =>{
            if(result)
            {
                this._router.navigate(['/']);
            }
            else
            {
                this.invalidLogin = true;
            }
    });
}
}
