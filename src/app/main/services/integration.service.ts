import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ServiceResult } from '../Models/ServiceResult';
import { ServiceListResponseDetailsVM } from '../models/integration/ServiceListResponseDetailsVM';
import { ServiceResponseDetailsVM } from '../models/integration/ServiceResponseDetailsVM';
import { StandartResponseDetailsVM } from '../models/StandartResponseDetailsVM';

@Injectable({
  providedIn: 'root'
})
export class IntegrationService {

  constructor(private baseService: BaseService) { }

  get(){

    return this.baseService.get<ServiceListResponseDetailsVM>(environment.Api.Main.Url + environment.Services.Integration.GetAll);
  }

  getById(){
    let myParams = new HttpParams()
    .append('id', '1')

    return this.baseService.get<ServiceResponseDetailsVM>(environment.Api.Main.Url + environment.Services.Integration.GetById, myParams);
  }

  post()  : Observable<ServiceResult<StandartResponseDetailsVM>>{
    
    let service = {
      Id: 2,
      Name: 'Test Service',
      Url: "test url",
      ServiceTypeId: 1,
      IsActive: true
    };

    return this.baseService.post<StandartResponseDetailsVM>(environment.Api.Main.Url + environment.Services.Integration.Post, service);
  }

  delete(){
    let myParams = new HttpParams()
      .append('id', '1')

      return this.baseService.delete<StandartResponseDetailsVM>(environment.Api.Main.Url + environment.Services.Integration.Delete, myParams);
  }
}
