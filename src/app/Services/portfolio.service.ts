import { StandartResponseDetailsVM } from './../Models/User/StandartResponseDetailsVM';
import { Observable } from 'rxjs';
import { ServiceResult } from './../Models/ServiceResult';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { PortfolioListResponseDetailsVM } from '../Models/Portfolio/PortfolioListResponseDetailsVM';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  private options = { headers: this.headers };

  constructor(private httpClient : HttpClient) { }

  get() : Observable<ServiceResult<PortfolioListResponseDetailsVM>>{
    let myParams = new HttpParams()
    .append('ItemCount', '10')
    .append('PageId', '1')
    .append('RoleId', '1');

  let headerWithToken = this.headers.set("Authorization", localStorage.getItem("token"));

  let options = { headers: headerWithToken, params: myParams };

  return this.httpClient.get<ServiceResult<PortfolioListResponseDetailsVM>>(environment.apiURL + environment.PortfolioGet, options)
    .pipe(
      map(responseData => {

        var resp = responseData as ServiceResult<PortfolioListResponseDetailsVM>;
        
        return resp;
      }));
  }

  post() : Observable<ServiceResult<StandartResponseDetailsVM>>{
    let post = {
      Id: -1,
      UserId: 1,
      CoinTypeId: 1
    };

    let headerWithToken = this.headers.set("Authorization", localStorage.getItem("token"));

    let options = { headers: headerWithToken };

    return this.httpClient.post(environment.apiURL + environment.PortfolioPost, JSON.stringify(post), options)
      .pipe(
        map(responseData => {

          var resp = responseData as ServiceResult<StandartResponseDetailsVM>;          

          return resp;
        }));
  }

  delete(): Observable<ServiceResult<StandartResponseDetailsVM>> {
    let myParams = new HttpParams()
      .append('id', '1')

    let headerWithToken = this.headers.set("Authorization", localStorage.getItem("token"));

    let options = { headers: headerWithToken, params: myParams };

    return this.httpClient.delete<ServiceResult<StandartResponseDetailsVM>>(environment.apiURL + environment.PortfolioDelete, options)
      .pipe(
        map(responseData => {
          var resp = responseData as ServiceResult<StandartResponseDetailsVM>;

          return resp;
        }));
  }
}
