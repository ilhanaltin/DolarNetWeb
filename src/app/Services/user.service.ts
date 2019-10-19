import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpClientModule, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  private options = { headers: this.headers };

  constructor(private httpClient : HttpClient) { }

  login() {
    let post = { UserName: 'ilhanaltin', Password: 'e44f5f0bf7a453a731217f288641ab16', RoleId: 1}            
    return this.httpClient.post(environment.apiURL + environment.Authenticate, JSON.stringify(post), this.options)
        .pipe(map(response=>response));
  }

  getAll(){

    let myParams = new HttpParams()
    .append('ItemCount', '10')
    .append('PageId', '1')
    .append('RoleId', '1');	

    let headerWithToken = this.headers.set("Authorization", localStorage.getItem("token"));
    
    let options = { headers: headerWithToken, params: myParams };

    return this.httpClient.get(environment.apiURL + environment.UserGetAll, options)
          .pipe(map(response=>response));
  }
}