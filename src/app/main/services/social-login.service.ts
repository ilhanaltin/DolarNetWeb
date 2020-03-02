import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { LoginResponseDetailsVM } from '../models/user/LoginResponseDetailsVM';
import { apiConfig } from 'src/@dolarnet/dolarnet-config/api.config';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SocialLoginService {

  constructor(private _baseService: BaseService) { }

  login(credentials) {

    return this._baseService.post<LoginResponseDetailsVM>(apiConfig.Api.Main.Url 
      + apiConfig.Services.User.SocialAuthenticate, 
        credentials)
        .pipe(
          map(response => {
            if(response.status == 200)
            {
                localStorage.setItem("token", response.result.token);
                localStorage.setItem("current-user",JSON.stringify(response.result.user));
                localStorage.setItem("current-user-avatar", response.result.user.avatar);
                localStorage.setItem("current-user-role", response.result.user.roleId.toString());
                return true;
            }

            return false;
         }));
  }
}
