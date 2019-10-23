import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ServiceResult } from '../Models/ServiceResult';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  private headerWithToken = this.headers.set("Authorization", localStorage.getItem("token"));

  private options = { headers: this.headers };
  private optionsWithToken = { headers: this.headerWithToken };

  constructor(private httpClient: HttpClient) { }

  post<T>(url: string, postValue: any, allowAnonymous: boolean = false) : Observable<ServiceResult<T>>
  {
    let selectedOptions = allowAnonymous ? this.options : this.optionsWithToken;
    return this.httpClient.post(url, JSON.stringify(postValue),  selectedOptions)
    .pipe(
      map(responseData => {
         return responseData as ServiceResult<T>;        
      }));
  }

  get<T>(url: string, params: HttpParams, allowAnonymous: boolean = false)
  {
    let selectedOptions = allowAnonymous ? this.options : this.optionsWithToken;

    return this.httpClient.get<ServiceResult<T>>(url, selectedOptions)
    .pipe(
      map(responseData => {

        var resp = responseData as ServiceResult<T>;
        
        return resp;
      }));
  }

  delete<T>(url: string, params: HttpParams, allowAnonymous: boolean = false)
  {
    let selectedOptions = allowAnonymous ? this.options : this.optionsWithToken;

    return this.httpClient.delete<ServiceResult<T>>(url, selectedOptions)
      .pipe(
        map(responseData => {
          var resp = responseData as ServiceResult<T>;

          return resp;
        }));
  }
}
