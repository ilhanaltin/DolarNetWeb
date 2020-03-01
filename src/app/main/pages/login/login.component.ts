import { SocialLoginService } from './../../services/social-login.service';
import { SocialUsersVM } from './../../models/user/SocialUsersVM';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { GlobalConstants } from '../../models/constants/GlobalConstants';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SocialLoginModule, AuthServiceConfig, AuthService } from "angularx-social-login";
import { GoogleLoginProvider, FacebookLoginProvider } from "angularx-social-login";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  response;  
  socialusers=new SocialUsersVM();

  loginForm: FormGroup;
  invalidLogin: boolean;

  constructor(private _authenticationService: AuthenticationService,  
              public OAuth: AuthService,  
              private SocialloginService: SocialLoginService,  
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

  public socialSignIn(socialProvider: string) {  
    let socialPlatformProvider;  
    if (socialProvider === 'facebook') {  
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;  
    } else if (socialProvider === 'google') {  
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;  
    }  
    this.OAuth.signIn(socialPlatformProvider).then(socialusers => {  
      console.log(socialProvider, socialusers);  
      console.log(socialusers);  
      //this.Savesresponse(socialusers);  
    });  
  }  

  /* Savesresponse(socialusers: SocialUsersVM) {  
    this.SocialloginService.Savesresponse(socialusers).subscribe((res: any) => {  
      debugger;  
      console.log(res);  
      this.socialusers=res;  
      this.response = res.userDetail;  
      localStorage.setItem('socialusers', JSON.stringify( this.socialusers));  
      console.log(localStorage.setItem('socialusers', JSON.stringify(this.socialusers)));  
      this._router.navigate([`/`]);  
    })  
  } */

}
