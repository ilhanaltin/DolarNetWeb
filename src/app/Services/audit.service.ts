import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpParams } from '@angular/common/http';
import { LogListResponseDetailsVM } from '../Models/Audit/LogListResponseDetailsVM';
import { environment } from 'src/environments/environment';
import { LogResponseDetailsVM } from '../Models/Audit/LogResponseDetailsVM';
import { Observable } from 'rxjs';
import { ServiceResult } from '../Models/ServiceResult';
import { StandartResponseDetailsVM } from '../Models/StandartResponseDetailsVM';

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

    return this.baseService.get<LogListResponseDetailsVM>(environment.apiURL + environment.AuditGetAll, myParams);

  }

  getById() : Observable<ServiceResult<LogResponseDetailsVM>> {
    let myParams = new HttpParams()
    .append('id', '1')

    return this.baseService.get<LogResponseDetailsVM>(environment.apiURL + environment.AuditGetById, myParams);
  }

  post() : Observable<ServiceResult<StandartResponseDetailsVM>>{
    
    let log = {
      LogTypeId: 1,
      ActionTypeId: 1,
      CrudTypeId: null,
      Detail: 'test log'
    };

    return this.baseService.post<StandartResponseDetailsVM>(environment.apiURL + environment.AuditPost, log);
  }
}
