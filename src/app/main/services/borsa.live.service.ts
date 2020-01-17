import { ServiceResult } from '../models/ServiceResult';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import { apiConfig } from 'src/@dolarnet/dolarnet-config/api.config';
import { DataValidation } from '../models/integration/DataValidation';
import { BorsaLiveRatesVM } from '../models/integration/borsa/BorsaLiveRatesVM';

@Injectable({
  providedIn: 'root'
})
export class BorsaLiveService {

  constructor(private baseService: BaseService) { }

  getFromStorage() : DataValidation<BorsaLiveRatesVM[]>
  {
    var response = new DataValidation<BorsaLiveRatesVM[]>();

    var periodicData = JSON.parse(localStorage.getItem(apiConfig.SessionKeys.Borsa.BorsaLiveDataRefreshedPeriodically)) as BorsaLiveRatesVM[];

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

  getFromApi() : Observable<ServiceResult<BorsaLiveRatesVM[]>>
  {
    return this.baseService.get(apiConfig.Api.Main.Url + apiConfig.Services.Borsa.GetLiveBorsa, null, true)
      .pipe(map(responseData =>{

        var resp = responseData as ServiceResult<BorsaLiveRatesVM[]>;

        localStorage.setItem(apiConfig.SessionKeys.Borsa.BorsaLiveDataRefreshedPeriodically ,JSON.stringify(resp.result));

        resp.status = 200;

        return resp;
      }));
  }
}          