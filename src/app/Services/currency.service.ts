import { DataValidation } from './../Models/Currency/DataValidation';
import { RatesVM } from './../Models/Currency/RatesVM';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { LatestVM } from '../Models/Currency/LatestVM';
import { Observable } from 'rxjs';
import { formatDate } from '@angular/common';
import { HistoricalVM } from '../Models/Currency/HistoricalVM';
import { ConvertVM } from '../Models/Currency/ConvertVM';
import { CurrencyRateVM } from '../Models/Currency/CurrencyRateVM';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor(private httpClient: HttpClient) { }

  getLatestFromStorage() : DataValidation<LatestVM>
  {
    var response = new DataValidation<LatestVM>();

    var periodicData = JSON.parse(localStorage.getItem(environment.SessionKeys.CurrencyDataRefreshedPeriodically)) as LatestVM;

    if(periodicData == null)
    {
      return response;
    }

    let storedDataDate = new Date(periodicData.timestamp).getTime();
    let nowDateTime = new Date(Date.now()).getTime();
    let time = nowDateTime - storedDataDate;  //msec
    let minutesDiff = time / (60 * 1000);

    if(minutesDiff > 60)
    {
      response.isValid = true;
      response.data = periodicData;
    }

    return response;
  }

  getLatest() : Observable<LatestVM>
  {
    let symbols= ['USD', 'EUR'];
    let baseCurrency = "TRY";

    return this.httpClient.get(environment.Api.Currency.Url 
        + environment.Api.Currency.Endpoint.Latest 
          + "?access_key=" + environment.Api.Currency.AccessKey 
            + "&base=" + baseCurrency
            + "&symbols=" + symbols)
      .pipe(map(responseData =>{
        var resp = responseData as LatestVM;

        let currencyRates = new CurrencyRateVM();
        var rates: RatesVM[] = [];
  
        let rateUSD = new RatesVM();
        rateUSD.currency = "USD";
        rateUSD.rate = responseData["rates"]["USD"] as number;
        rates.push(rateUSD);
  
        let rateEUR = new RatesVM();
        rateEUR.currency = "EUR";
        rateEUR.rate = responseData["rates"]["EUR"] as number;
        rates.push(rateEUR);
  
        currencyRates.date = resp.date;
        currencyRates.rates = rates;
        resp.currencyRates = currencyRates;

        localStorage.setItem(environment.SessionKeys.CurrencyDataRefreshedPeriodically ,JSON.stringify(resp));

        return resp;
      }));
  }

  getYesterdayFromStorage() : DataValidation<HistoricalVM>
  {
    var response = new DataValidation<HistoricalVM>();

    var yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    var storedYesterdayData = JSON.parse(localStorage.getItem(environment.SessionKeys.CurrencyDataHistoricalYesterday)) as HistoricalVM;

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

    console.log(hoursDiff);

    if(hoursDiff <= 24)
    {
      response.isValid = true;
      response.data = storedYesterdayData;
    }

    return response;
  }

  getYesterday() : Observable<HistoricalVM>
  {    
    var yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    let symbols = ['USD', 'EUR'];
    let baseCurrency = "TRY";

    return this.httpClient.get(environment.Api.Currency.Url 
      + formatDate(yesterday,'yyyy-MM-dd','en-US').toString()
        + "?access_key=" + environment.Api.Currency.AccessKey 
          + "&base=" + baseCurrency
          + "&symbols=" + symbols.join(","))
    .pipe(map(responseData =>{
      var resp = responseData as HistoricalVM;

      let currencyRates = new CurrencyRateVM();
      var rates: RatesVM[] = [];

      let rateUSD = new RatesVM();
      rateUSD.currency = "USD";
      rateUSD.rate = responseData["rates"]["USD"] as number;
      rates.push(rateUSD);

      let rateEUR = new RatesVM();
      rateEUR.currency = "EUR";
      rateEUR.rate = responseData["rates"]["EUR"] as number;
      rates.push(rateEUR);

      currencyRates.date = resp.date;
      currencyRates.rates = rates;
      resp.currencyRates = currencyRates;

      localStorage.setItem(environment.SessionKeys.CurrencyDataHistoricalYesterday ,JSON.stringify(resp));

      return resp;
    }));
  }

  convertTo() : Observable<ConvertVM>{
    
    let from = "TRY";
    let to = "USD";
    let amount = 25;

    return this.httpClient.get(environment.Api.Currency.Url 
      + environment.Api.Currency.Endpoint.Convert 
        + "?access_key=" + environment.Api.Currency.AccessKey 
          + "&from=" + from
          + "&to=" + to
          + "&amount=" + amount)
    .pipe(map(responseData => {

      var resp = responseData as ConvertVM;

      return resp;
    }));
  }
}
