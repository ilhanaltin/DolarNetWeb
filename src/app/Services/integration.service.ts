import { ServiceResponseDetailsVM } from './../Models/Integration/ServiceResponseDetailsVM';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpParams } from '@angular/common/http';
import { ServiceListResponseDetailsVM } from '../Models/Integration/ServiceListResponseDetailsVM';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ServiceResult } from '../Models/ServiceResult';
import { StandartResponseDetailsVM } from '../Models/StandartResponseDetailsVM';

@Injectable({
  providedIn: 'root'
})
export class IntegrationService {

  constructor(private baseService: BaseService) { }

  get(){

    return this.baseService.get<ServiceListResponseDetailsVM>(environment.apiURL + environment.IntegrationGetAll);
  }

  getById(){
    let myParams = new HttpParams()
    .append('id', '1')

    return this.baseService.get<ServiceResponseDetailsVM>(environment.apiURL + environment.IntegrationGetById, myParams);
  }

  post()  : Observable<ServiceResult<StandartResponseDetailsVM>>{
    
    let service = {
      Id: 2,
      Name: 'Test Service',
      Url: "test url",
      ServiceTypeId: 1,
      IsActive: true
    };

    return this.baseService.post<StandartResponseDetailsVM>(environment.apiURL + environment.IntegrationPost, service);
  }

  delete(){
    let myParams = new HttpParams()
      .append('id', '1')

      return this.baseService.delete<StandartResponseDetailsVM>(environment.apiURL + environment.IntegrationDelete, myParams);
  }
}
