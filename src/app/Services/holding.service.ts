import { ServiceResult } from './../Models/ServiceResult';
import { HoldingListResponseDetailsVM } from './../Models/Holding/HoldingListResponseDetailsVM';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { environment } from 'src/environments/environment';
import { StandartResponseDetailsVM } from '../Models/StandartResponseDetailsVM';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';

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

    return this.baseService.get<HoldingListResponseDetailsVM>(environment.apiURL + environment.HoldingGet, myParams);
  }

  post() : Observable<ServiceResult<StandartResponseDetailsVM>>{
    let post = {
      Id: -1,
      UserId: 1,
      CoinTypeId: 1
    };

    return this.baseService.post(environment.apiURL + environment.HoldingoPost, post);
  }

  delete(): Observable<ServiceResult<StandartResponseDetailsVM>> {
    let myParams = new HttpParams()
      .append('id', '1')

    return this.baseService.delete<ServiceResult<StandartResponseDetailsVM>>(environment.apiURL + environment.HoldingoDelete, myParams);
  }
}