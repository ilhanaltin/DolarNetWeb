import { Observable } from 'rxjs';
import { ServiceResult } from './../models/ServiceResult';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { BaseService } from './base.service';
import { PortfolioListResponseDetailsVM } from '../models/portfolio/PortfolioListResponseDetailsVM';
import { StandartResponseDetailsVM } from '../models/StandartResponseDetailsVM';
import { apiConfig } from 'src/@dolarnet/dolarnet-config/api.config';

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

    return this.baseService.get<PortfolioListResponseDetailsVM>(apiConfig.Api.Main.Url + apiConfig.Services.Portfolio.Get, myParams);
  }

  post() : Observable<ServiceResult<StandartResponseDetailsVM>>{
    let post = {
      Id: -1,
      UserId: 1,
      CoinTypeId: 1
    };

    return this.baseService.post(apiConfig.Api.Main.Url + apiConfig.Services.Portfolio.Post, post);
  }

  delete(): Observable<ServiceResult<StandartResponseDetailsVM>> {
    let myParams = new HttpParams()
      .append('id', '1')

    return this.baseService.delete<ServiceResult<StandartResponseDetailsVM>>(apiConfig.Api.Main.Url + apiConfig.Services.Portfolio.Delete, myParams);
  }
}