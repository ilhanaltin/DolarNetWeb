import { DataValidation } from '../models/integration/DataValidation';
import { ServiceResult } from './../models/ServiceResult';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import { CurrencyRatesVM } from '../models/integration/currency/CurrencyRatesVM';
import { apiConfig } from 'src/@dolarnet/dolarnet-config/api.config';
import { CurrencyHistorySearchCriteriaVM } from '../models/integration/currency/CurrencyHistorySearchCriteriaVM';
import { CurrencyHistoryListResponseDetailsVM } from '../models/integration/currency/CurrencyHistoryListResponseDetailsVM';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor(private baseService: BaseService) { }

  getFromStorage() : DataValidation<CurrencyRatesVM[]>
  {
    var response = new DataValidation<CurrencyRatesVM[]>();

    var periodicData = JSON.parse(localStorage.getItem(apiConfig.SessionKeys.Currency.CurrencyDataRefreshedPeriodically)) as CurrencyRatesVM[];

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

  getFromApi() : Observable<ServiceResult<CurrencyRatesVM[]>>
  {
    return this.baseService.get(apiConfig.Api.Main.Url + apiConfig.Services.Currency.GetAllCurrency, null)
      .pipe(map(responseData =>{

        var resp = responseData as ServiceResult<CurrencyRatesVM[]>;

        localStorage.setItem(apiConfig.SessionKeys.Currency.CurrencyDataRefreshedPeriodically ,JSON.stringify(resp.result));

        resp.status = 200;

        return resp;
      }));
  }

  getHistory(criteria: CurrencyHistorySearchCriteriaVM) : Observable<ServiceResult<CurrencyHistoryListResponseDetailsVM>>{
    
    let myParams = new HttpParams()
      .append('Period', criteria.period.toString())
      .append('Code', criteria.code.toString());
      
    return this.baseService.get<CurrencyHistoryListResponseDetailsVM>(apiConfig.Api.Main.Url + apiConfig.Services.Currency.GetCurrencyHistory, myParams);
  }
}          