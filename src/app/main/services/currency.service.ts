import { DataValidation } from './../models/currency/DataValidation';
import { ServiceResult } from './../models/ServiceResult';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { LatestVM } from '../models/Currency/LatestVM';
import { Observable } from 'rxjs';
import { formatDate } from '@angular/common';
import { BaseService } from './base.service';
import { HttpParams } from '@angular/common/http';
import { CurrencyRateVM } from '../models/currency/CurrencyRateVM';
import { RatesVM } from '../models/currency/RatesVM';
import { HistoricalVM } from '../models/currency/HistoricalVM';
import { ConvertCurrencyVM } from '../models/currency/ConvertCurrencyVM';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor(private baseService: BaseService) { }


  getFromStorage() : DataValidation<LatestVM>
  {
    var response = new DataValidation<LatestVM>();

    var periodicData = JSON.parse(localStorage.getItem(environment.SessionKeys.Currency.CurrencyDataRefreshedPeriodically)) as LatestVM;

    if(periodicData == null)
    {
      return response;
    }

    let storedDataDate = new Date(periodicData.timestamp * 1000).getTime();
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

  getFromApi() : Observable<ServiceResult<LatestVM>>
  {
    let symbols= ['USD', 'EUR'];
    let baseCurrency = "TRY";

    let myParams = new HttpParams()
    .append('access_key', environment.Api.Currency.AccessKey)
    .append('base', baseCurrency)
    .append('symbols', symbols.join(","));

    return this.baseService.getForCurrency(environment.Api.Currency.Url 
      + environment.Api.Currency.Endpoint.Latest, myParams)
      .pipe(map(responseData =>{
        var resp = responseData as ServiceResult<LatestVM>;

        let currencyRates = new CurrencyRateVM();
        var rates: RatesVM[] = [];
  
        let rateUSD = new RatesVM();
        rateUSD.currency = "USD";
        rateUSD.rate = resp.result["rates"]["USD"] as number;
        rates.push(rateUSD);
  
        let rateEUR = new RatesVM();
        rateEUR.currency = "EUR";
        rateEUR.rate = resp.result["rates"]["EUR"] as number;
        rates.push(rateEUR);
  
        currencyRates.date = resp.result.date;
        currencyRates.rates = rates;
        resp.result.currencyRates = currencyRates;

        localStorage.setItem(environment.SessionKeys.Currency.CurrencyDataRefreshedPeriodically ,JSON.stringify(resp.result));

        resp.status = 200;

        return resp;
      }));
  }
  
  getYesterdayFromStorage() : DataValidation<HistoricalVM>
  {
    var response = new DataValidation<HistoricalVM>();

    var yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    var storedYesterdayData = JSON.parse(localStorage.getItem(environment.SessionKeys.Currency.CurrencyDataHistoricalYesterday)) as HistoricalVM;

    if(storedYesterdayData == null)
    {
      return response;
    }

    let storedDataDate = new Date(storedYesterdayData.date).getTime();
    var yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    var yesterdayTime = yesterday.getTime();
    let time = yesterdayTime - storedDataDate;  //msec
    let hoursDiff = time / (3600 * 1000);

    if(hoursDiff <= 24)
    {
      response.isValid = true;
      response.data = storedYesterdayData;
    }

    return response;
  }

  getYesterday() : Observable<ServiceResult<HistoricalVM>>
  {    
    var yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    let symbols = ['USD', 'EUR'];
    let baseCurrency = "TRY";

    let myParams = new HttpParams()
    .append('access_key', environment.Api.Currency.AccessKey)
    .append('base', baseCurrency)
    .append('symbols', symbols.join(","));

    return this.baseService.getForCurrency(environment.Api.Currency.Url 
      + formatDate(yesterday,'yyyy-MM-dd','en-US').toString(), myParams)
    .pipe(map(responseData =>{
      
      var resp = responseData as ServiceResult<HistoricalVM>;

      console.log(resp);
      let currencyRates = new CurrencyRateVM();
      var rates: RatesVM[] = [];

      let rateUSD = new RatesVM();
      rateUSD.currency = "USD";
      rateUSD.rate = resp.result["rates"]["USD"] as number;
      rates.push(rateUSD);

      let rateEUR = new RatesVM();
      rateEUR.currency = "EUR";
      rateEUR.rate = resp.result["rates"]["EUR"] as number;
      rates.push(rateEUR);

      currencyRates.date = resp.result.date;
      currencyRates.rates = rates;
      resp.result.currencyRates = currencyRates;

      localStorage.setItem(environment.SessionKeys.Currency.CurrencyDataHistoricalYesterday ,JSON.stringify(resp));

      return resp;
    }));
  }

  convertTo() : Observable<ServiceResult<ConvertCurrencyVM>>{
    
    let from = "TRY";
    let to = "USD";
    let amount = 25;

    return this.baseService.getForCurrency(environment.Api.Currency.Url 
      + environment.Api.Currency.Endpoint.Convert 
        + "?access_key=" + environment.Api.Currency.AccessKey 
          + "&from=" + from
          + "&to=" + to
          + "&amount=" + amount)
    .pipe(map(responseData => {

      var resp = responseData as ServiceResult<ConvertCurrencyVM>;

      return resp;
    }));
  }
}
