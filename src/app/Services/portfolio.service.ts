import { StandartResponseDetailsVM } from '../Models/StandartResponseDetailsVM';
import { Observable } from 'rxjs';
import { ServiceResult } from './../Models/ServiceResult';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { PortfolioListResponseDetailsVM } from '../Models/Portfolio/PortfolioListResponseDetailsVM';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  constructor(private baseService: BaseService) { }

  get() : Observable<ServiceResult<PortfolioListResponseDetailsVM>>{
    
    let myParams = new HttpParams()
    .append('ItemCount', '10')
    .append('PageId', '1')
    .append('RoleId', '1');

    return this.baseService.get<PortfolioListResponseDetailsVM>(environment.apiURL + environment.PortfolioGet, myParams);
  }

  post() : Observable<ServiceResult<StandartResponseDetailsVM>>{
    let post = {
      Id: -1,
      UserId: 1,
      CoinTypeId: 1
    };

    return this.baseService.post(environment.apiURL + environment.PortfolioPost, post);
  }

  delete(): Observable<ServiceResult<StandartResponseDetailsVM>> {
    let myParams = new HttpParams()
      .append('id', '1')

    return this.baseService.delete<ServiceResult<StandartResponseDetailsVM>>(environment.apiURL + environment.PortfolioDelete, myParams);
  }
}