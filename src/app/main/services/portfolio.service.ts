import { Observable } from 'rxjs';
import { ServiceResult } from './../Models/ServiceResult';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { BaseService } from './base.service';
import { environment } from 'src/environments/environment';
import { PortfolioListResponseDetailsVM } from '../models/portfolio/PortfolioListResponseDetailsVM';
import { StandartResponseDetailsVM } from '../models/StandartResponseDetailsVM';

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

    return this.baseService.get<PortfolioListResponseDetailsVM>(environment.Api.Main.Url + environment.Services.Portfolio.Get, myParams);
  }

  post() : Observable<ServiceResult<StandartResponseDetailsVM>>{
    let post = {
      Id: -1,
      UserId: 1,
      CoinTypeId: 1
    };

    return this.baseService.post(environment.Api.Main.Url + environment.Services.Portfolio.Post, post);
  }

  delete(): Observable<ServiceResult<StandartResponseDetailsVM>> {
    let myParams = new HttpParams()
      .append('id', '1')

    return this.baseService.delete<ServiceResult<StandartResponseDetailsVM>>(environment.Api.Main.Url + environment.Services.Portfolio.Delete, myParams);
  }
}