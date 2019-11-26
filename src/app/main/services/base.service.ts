import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ServiceResult } from '../models/ServiceResult';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  private headerWithToken = this.headers.set("Authorization", localStorage.getItem("token"));  

  constructor(private httpClient: HttpClient) { }

  post<T>(url: string, postValue: any, allowAnonymous: boolean = false) : Observable<ServiceResult<T>>
  {
    let options = { headers: allowAnonymous ? this.headers: this.headerWithToken };

    return this.httpClient.post(url, JSON.stringify(postValue),  options)
    .pipe(
      map(responseData => {
         return responseData as ServiceResult<T>;        
      }));
  }

  get<T>(url: string, myParams: HttpParams = null, allowAnonymous: boolean = false)
  {
    let options = myParams == null ? 
          { headers: allowAnonymous ? this.headers: this.headerWithToken} : 
              { headers: allowAnonymous ? this.headers: this.headerWithToken , params: myParams};

    return this.httpClient.get<ServiceResult<T>>(url, options)
    .pipe(
      map(responseData => {

        var resp = responseData as ServiceResult<T>;
        
        return resp;
      }));
  }

  getWithNoParameter<T>(url: string, allowAnonymous: boolean = false)
  {
    let options = { headers: allowAnonymous ? this.headers: this.headerWithToken};

    return this.httpClient.get<ServiceResult<T>>(url, options)
    .pipe(
      map(responseData => {

        var resp = responseData as ServiceResult<T>;
        
        return resp;
      }));
  }

  delete<T>(url: string, myParams: HttpParams, allowAnonymous: boolean = false)
  {
    let options = { headers: allowAnonymous ? this.headers: this.headerWithToken , params: myParams};

    return this.httpClient.delete<ServiceResult<T>>(url, options)
      .pipe(
        map(responseData => {
          var resp = responseData as ServiceResult<T>;

          return resp;
        }));
  }

  getForCoins<T>(url: string, params: HttpParams = null)
  {
    var headersForCoins = this.headers.set(environment.Api.Coin.Header.Header_Host, environment.Api.Coin.Header.Header_Host_Value);  
    headersForCoins = headersForCoins.set(environment.Api.Coin.Header.Header_Key, environment.Api.Coin.Header.Header_Key_Value);  

    let options = params == null ? {headers: headersForCoins}: {headers: headersForCoins, params: params};

    return this.httpClient.get(url, options)
    .pipe(
      map(responseData => {

        var resp = new ServiceResult<T>();
        resp.result = responseData as T;
        resp.status = 200;

        return resp;
      }));
  }

  getForCurrency<T>(url: string, params: HttpParams = null)
  {
    return this.httpClient.get(url, {params: params})
    .pipe(
      map(responseData => {

        var resp = new ServiceResult<T>();
        resp.result = responseData as T;
        resp.status = 200;
        
        return resp;
      }));
  }
}
