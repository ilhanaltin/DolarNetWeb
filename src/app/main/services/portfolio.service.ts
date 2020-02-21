import { AuthenticationService } from './authentication.service';
import { ServiceResult } from './../Models/ServiceResult';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { PortfolioListResponseDetailsVM } from '../models/portfolio/PortfolioListResponseDetailsVM';
import { StandartResponseDetailsVM } from '../models/StandartResponseDetailsVM';
import { apiConfig } from 'src/@dolarnet/dolarnet-config/api.config';
import { PortfolioSearchCriteriaVM } from '../models/portfolio/PortfolioSearchCriteriaVM';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  constructor(private baseService: BaseService, private _authService: AuthenticationService) { }

  get(criteria: PortfolioSearchCriteriaVM) : Observable<ServiceResult<PortfolioListResponseDetailsVM>>{
    
    let myParams = new HttpParams()
      .append('ItemCount', criteria.itemCount.toString())
      .append('PageId', criteria.pageId.toString())
      .append('UserId', criteria.userId.toString());

    return this.baseService.get<PortfolioListResponseDetailsVM>(apiConfig.Api.Main.Url + apiConfig.Services.Portfolio.Get, myParams);
  }

  post(portfolio) : Observable<ServiceResult<StandartResponseDetailsVM>>{

    return this.baseService.post(apiConfig.Api.Main.Url + apiConfig.Services.Portfolio.Post, portfolio);
  }

  delete(id: number): Observable<ServiceResult<StandartResponseDetailsVM>> {
    
    let myParams = new HttpParams()
      .append('id', id.toString())

    return this.baseService.delete<ServiceResult<StandartResponseDetailsVM>>(apiConfig.Api.Main.Url + apiConfig.Services.Portfolio.Delete, myParams);
  }
}