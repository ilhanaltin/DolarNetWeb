import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ServiceResult } from '../models/ServiceResult';
import { Observable } from 'rxjs';
import { apiConfig } from 'src/@dolarnet/dolarnet-config/api.config';

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

  getForCurrency<T>(url: string)
  {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' })
    .set("Authorization", apiConfig.Api.CollectApi.HttpHeaders.Value);
  
    //var headersForCurrency = this.headers.set(apiConfig.Api.CollectApi.HttpHeaders.Key, apiConfig.Api.CollectApi.HttpHeaders.Value);  

    return this.httpClient.get(url, { headers: headers })
    .pipe(
      map(responseData => {

        var resp = new ServiceResult<T>();
        resp.result = responseData as T;
        resp.status = 200;
        
        return resp;
      }));
  }
}
