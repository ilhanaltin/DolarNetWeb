import { ServiceResult } from '../models/ServiceResult';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import { apiConfig } from 'src/@dolarnet/dolarnet-config/api.config';
import { DataValidation } from '../models/integration/DataValidation';
import { BorsaHisseRatesVM } from '../models/integration/borsa/BorsaHisseRatesVM';

@Injectable({
  providedIn: 'root'
})
export class BorsaHisseService {

  constructor(private baseService: BaseService) { }

  getFromStorage() : DataValidation<BorsaHisseRatesVM[]>
  {
    var response = new DataValidation<BorsaHisseRatesVM[]>();

    var periodicData = JSON.parse(localStorage.getItem(apiConfig.SessionKeys.Borsa.BorsaHisseDataRefreshedPeriodically)) as BorsaHisseRatesVM[];

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

  getFromApi() : Observable<ServiceResult<BorsaHisseRatesVM[]>>
  {
    return this.baseService.get(apiConfig.Api.Main.Url + apiConfig.Services.Borsa.GetHisseSenedi, null)
      .pipe(map(responseData =>{

        var resp = responseData as ServiceResult<BorsaHisseRatesVM[]>;

        localStorage.setItem(apiConfig.SessionKeys.Borsa.BorsaHisseDataRefreshedPeriodically ,JSON.stringify(resp.result));

        resp.status = 200;

        return resp;
      }));
  }
}          