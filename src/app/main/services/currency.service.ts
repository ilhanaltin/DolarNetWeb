import { DataValidation } from '../models/integration/DataValidation';
import { ServiceResult } from './../models/ServiceResult';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import { CurrencyRatesVM } from '../models/integration/currency/CurrencyRatesVM';
import { apiConfig } from 'src/@dolarnet/dolarnet-config/api.config';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor(private baseService: BaseService) { }

  getFromStorage() : DataValidation<CurrencyRatesVM[]>
  {
    var response = new DataValidation<CurrencyRatesVM[]>();

    var periodicData = JSON.parse(localStorage.getItem(apiConfig.SessionKeys.Currency.CurrencyDataRefreshedPeriodically)) as CurrencyRatesVM[];

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

  getFromApi() : Observable<ServiceResult<CurrencyRatesVM[]>>
  {
    return this.baseService.get(apiConfig.Api.Main.Url + apiConfig.Services.Currency.GetAllCurrency)
      .pipe(map(responseData =>{

        var resp = responseData as ServiceResult<CurrencyRatesVM[]>;

        localStorage.setItem(apiConfig.SessionKeys.Currency.CurrencyDataRefreshedPeriodically ,JSON.stringify(resp.result));

        resp.status = 200;

        return resp;
      }));
  }
}          