import { ServiceResult } from './../Models/ServiceResult';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { HoldingListResponseDetailsVM } from '../models/holding/HoldingListResponseDetailsVM';
import { StandartResponseDetailsVM } from '../models/StandartResponseDetailsVM';

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

    return this.baseService.get<HoldingListResponseDetailsVM>(environment.Api.Main.Url + environment.Services.Holding.Get, myParams);
  }

  post() : Observable<ServiceResult<StandartResponseDetailsVM>>{
    let post = {
      Id: -1,
      UserId: 1,
      CoinTypeId: 1
    };

    return this.baseService.post(environment.Api.Main.Url + environment.Services.Holding.Post, post);
  }

  delete(): Observable<ServiceResult<StandartResponseDetailsVM>> {
    let myParams = new HttpParams()
      .append('id', '1')

    return this.baseService.delete<ServiceResult<StandartResponseDetailsVM>>(environment.Api.Main.Url + environment.Services.Holding.Delete, myParams);
  }
}