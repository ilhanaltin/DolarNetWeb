import { ServiceResult } from '../models/ServiceResult';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import { apiConfig } from 'src/@dolarnet/dolarnet-config/api.config';
import { GoldRatesVM } from '../models/integration/gold/GoldRatesVM';
import { DataValidation } from '../models/integration/DataValidation';

@Injectable({
  providedIn: 'root'
})
export class GoldService {

  constructor(private baseService: BaseService) { }

  getFromStorage() : DataValidation<GoldRatesVM[]>
  {
    var response = new DataValidation<GoldRatesVM[]>();

    var periodicData = JSON.parse(localStorage.getItem(apiConfig.SessionKeys.Gold.GoldDataRefreshedPeriodically)) as GoldRatesVM[];

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

  getFromApi() : Observable<ServiceResult<GoldRatesVM[]>>
  {
    return this.baseService.get(apiConfig.Api.Main.Url + apiConfig.Services.Gold.GetAllGold, null)
      .pipe(map(responseData =>{

        var resp = responseData as ServiceResult<GoldRatesVM[]>;

        localStorage.setItem(apiConfig.SessionKeys.Gold.GoldDataRefreshedPeriodically ,JSON.stringify(resp.result));

        resp.status = 200;

        return resp;
      }));
  }
}          