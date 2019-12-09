import { DataValidation } from '../models/integration/DataValidation';
import { ServiceResult } from '../models/ServiceResult';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import { EmtiaRatesVM } from '../models/integration/emtia/EmtiaRatesVM';
import { apiConfig } from 'src/@dolarnet/dolarnet-config/api.config';

@Injectable({
  providedIn: 'root'
})
export class EmtiaService {

  constructor(private baseService: BaseService) { }

  getFromStorage() : DataValidation<EmtiaRatesVM[]>
  {
    var response = new DataValidation<EmtiaRatesVM[]>();

    var periodicData = JSON.parse(localStorage.getItem(apiConfig.SessionKeys.Emtia.EmtiaDataRefreshedPeriodically)) as EmtiaRatesVM[];

    if(periodicData == null)
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

  getFromApi() : Observable<ServiceResult<EmtiaRatesVM[]>>
  {
    return this.baseService.get(apiConfig.Api.Main.Url + apiConfig.Services.Emtia.GetAllEmtia)
      .pipe(map(responseData =>{

        var resp = responseData as ServiceResult<EmtiaRatesVM[]>;

        localStorage.setItem(apiConfig.SessionKeys.Emtia.EmtiaDataRefreshedPeriodically ,JSON.stringify(resp.result));

        resp.status = 200;

        return resp;
      }));
  }
}          