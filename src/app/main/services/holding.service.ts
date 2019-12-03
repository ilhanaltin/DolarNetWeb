import { ServiceResult } from './../Models/ServiceResult';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { HoldingListResponseDetailsVM } from '../models/holding/HoldingListResponseDetailsVM';
import { StandartResponseDetailsVM } from '../models/StandartResponseDetailsVM';
import { apiConfig } from 'src/@dolarnet/dolarnet-config/api.config';

@Injectable({
  providedIn: 'root'
})
export class HoldingService {

  constructor(private baseService: BaseService) { }

  get() : Observable<ServiceResult<HoldingListResponseDetailsVM>>{
    
    let myParams = new HttpParams()
    .append('ItemCount', '10')
    .append('PageId', '1')
    .append('RoleId', '1');

    return this.baseService.get<HoldingListResponseDetailsVM>(apiConfig.Api.Main.Url + apiConfig.Services.Holding.Get, myParams);
  }

  post() : Observable<ServiceResult<StandartResponseDetailsVM>>{
    let post = {
      Id: -1,
      UserId: 1,
      CoinTypeId: 1
    };

    return this.baseService.post(apiConfig.Api.Main.Url + apiConfig.Services.Holding.Post, post);
  }

  delete(): Observable<ServiceResult<StandartResponseDetailsVM>> {
    let myParams = new HttpParams()
      .append('id', '1')

    return this.baseService.delete<ServiceResult<StandartResponseDetailsVM>>(apiConfig.Api.Main.Url + apiConfig.Services.Holding.Delete, myParams);
  }
}