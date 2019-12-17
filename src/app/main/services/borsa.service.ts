import { ServiceResult } from '../models/ServiceResult';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import { apiConfig } from 'src/@dolarnet/dolarnet-config/api.config';
import { BorsaRatesVM } from '../models/integration/borsa/BorsaRatesVM';
import { DataValidation } from '../models/integration/DataValidation';

@Injectable({
  providedIn: 'root'
})
export class BorsaService {

  constructor(private baseService: BaseService) { }

  getFromStorage() : DataValidation<BorsaRatesVM[]>
  {
    var response = new DataValidation<BorsaRatesVM[]>();

    var periodicData = JSON.parse(localStorage.getItem(apiConfig.SessionKeys.Borsa.BorsaDataRefreshedPeriodically)) as BorsaRatesVM[];

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

  getFromApi() : Observable<ServiceResult<BorsaRatesVM[]>>
  {
    return this.baseService.get(apiConfig.Api.Main.Url + apiConfig.Services.Borsa.GetAllBorsa, null, true)
      .pipe(map(responseData =>{

        var resp = responseData as ServiceResult<BorsaRatesVM[]>;

        localStorage.setItem(apiConfig.SessionKeys.Borsa.BorsaDataRefreshedPeriodically ,JSON.stringify(resp.result));

        resp.status = 200;

        return resp;
      }));
  }
}          