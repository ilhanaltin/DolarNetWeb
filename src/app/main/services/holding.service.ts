import { AuthenticationService } from './authentication.service';
import { ServiceResult } from './../Models/ServiceResult';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { HoldingListResponseDetailsVM } from '../models/holding/HoldingListResponseDetailsVM';
import { StandartResponseDetailsVM } from '../models/StandartResponseDetailsVM';
import { apiConfig } from 'src/@dolarnet/dolarnet-config/api.config';
import { HoldingSearchCriteriaVM } from '../models/holding/HoldingSearchCriteriaVM';

@Injectable({
  providedIn: 'root'
})
export class HoldingService {

  constructor(private baseService: BaseService, private _authService: AuthenticationService) { }

  get(criteria: HoldingSearchCriteriaVM) : Observable<ServiceResult<HoldingListResponseDetailsVM>>{
    
    let myParams = new HttpParams()
      .append('ItemCount', criteria.itemCount.toString())
      .append('PageId', criteria.pageId.toString())
      .append('UserId', criteria.userId.toString());

    return this.baseService.get<HoldingListResponseDetailsVM>(apiConfig.Api.Main.Url + apiConfig.Services.Holding.Get, myParams);
  }

  post(holding) : Observable<ServiceResult<StandartResponseDetailsVM>>{

    return this.baseService.post(apiConfig.Api.Main.Url + apiConfig.Services.Holding.Post, holding);
  }

  delete(id: number): Observable<ServiceResult<StandartResponseDetailsVM>> {
    
    let myParams = new HttpParams()
      .append('id', id.toString())

    return this.baseService.delete<ServiceResult<StandartResponseDetailsVM>>(apiConfig.Api.Main.Url + apiConfig.Services.Holding.Delete, myParams);
  }
}