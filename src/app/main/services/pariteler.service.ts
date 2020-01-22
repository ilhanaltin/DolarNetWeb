import { DataValidation } from '../models/integration/DataValidation';
import { ServiceResult } from '../models/ServiceResult';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import { ParitelerVM } from '../models/integration/currency/ParitelerVM';
import { apiConfig } from 'src/@dolarnet/dolarnet-config/api.config';

@Injectable({
  providedIn: 'root'
})
export class ParitelerService {

  constructor(private baseService: BaseService) { }

  getFromStorage() : DataValidation<ParitelerVM[]>
  {
    var response = new DataValidation<ParitelerVM[]>();

    var periodicData = JSON.parse(localStorage.getItem(apiConfig.SessionKeys.Currency.PariteDataRefreshedPeriodically)) as ParitelerVM[];

    if(periodicData == null || periodicData.length == 0)
    {
      return response;
    }

    let storedDataDate = Date.parse(periodicData[0].dateTime.toString());
    let nowDateTime = new Date(Date.now()).getTime();
    let time = nowDateTime - storedDataDate;  //msec
    let minutesDiff = time / (60 * 1000);

    if(minutesDiff < 60)
    {
      response.isValid = true;
      response.data = periodicData;
    }

    return response;
  }

  getFromApi() : Observable<ServiceResult<ParitelerVM[]>>
  {
    return this.baseService.get(apiConfig.Api.Main.Url + apiConfig.Services.Currency.GetPariteler, null)
      .pipe(map(responseData =>{

        var resp = responseData as ServiceResult<ParitelerVM[]>;

        localStorage.setItem(apiConfig.SessionKeys.Currency.PariteDataRefreshedPeriodically ,JSON.stringify(resp.result));

        resp.status = 200;

        return resp;
      }));
  }
}          