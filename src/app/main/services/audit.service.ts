import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServiceResult } from '../models/ServiceResult';
import { LogListResponseDetailsVM } from '../models/audit/LogListResponseDetailsVM';
import { LogResponseDetailsVM } from '../models/audit/LogResponseDetailsVM';
import { StandartResponseDetailsVM } from '../models/StandartResponseDetailsVM';
import { apiConfig } from 'src/@dolarnet/dolarnet-config/api.config';

@Injectable({
  providedIn: 'root'
})
export class AuditService {

  constructor(private baseService: BaseService) { }

  get(){
    let myParams = new HttpParams()
    .append('ItemCount', '10')
    .append('PageId', '1')
    .append('TypeId', '-1');

    return this.baseService.get<LogListResponseDetailsVM>(apiConfig.Api.Main.Url + apiConfig.Services.Audit.GetAll, myParams);

  }

  getById() : Observable<ServiceResult<LogResponseDetailsVM>> {
    let myParams = new HttpParams()
    .append('id', '1')

    return this.baseService.get<LogResponseDetailsVM>(apiConfig.Api.Main.Url + apiConfig.Services.Audit.GetById, myParams);
  }

  post() : Observable<ServiceResult<StandartResponseDetailsVM>>{
    
    let log = {
      LogTypeId: 1,
      ActionTypeId: 1,
      CrudTypeId: null,
      Detail: 'test log'
    };

    return this.baseService.post<StandartResponseDetailsVM>(apiConfig.Api.Main.Url + apiConfig.Services.Audit.Post, log);
  }
}
