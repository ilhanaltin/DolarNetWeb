import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private _authenticationService: AuthenticationService,    
    private _router: Router,
    private _formBuilder: FormBuilder) { }

  ngOnInit() {
    
      this.registerForm = this._formBuilder.group({
        name        : ['', Validators.required],
        lastName    : ['', Validators.required],
        nickName    : ['', Validators.required],
        avatar          : null,
        email           : ['', [Validators.required, Validators.email]],
        password        : ['', Validators.required],
        passwordConfirm : ['', [Validators.required, confirmPasswordValidator]],
        roleId          : [3],
        statusId        : [1]
    });        
  }

  register(user)
  {
      console.log(user);

      this._authenticationService.register(user)
        .subscribe(result =>{
            if(result)
            {
                this._router.navigate(['/login']);
            }            
    });
  }
}

/**
 * Confirm password validator
 *
 * @param {AbstractControl} control
 * @returns {ValidationErrors | null}
 */
export const confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

  if ( !control.parent || !control )
  {
      return null;
  }

  
  const password = control.parent.get('password');
  const passwordConfirm = control.parent.get('passwordConfirm');

  if ( !password || !passwordConfirm )
  {
      return null;
  }

  if ( passwordConfirm.value === '' )
  {
      return null;
  }

  if ( password.value === passwordConfirm.value )
  {
      return null;
  }

  return {passwordsNotMatching: true};
};
