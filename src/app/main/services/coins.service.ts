import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServiceResult } from '../Models/ServiceResult';
import { BaseService } from './base.service';
import { StorageService } from './storage.service';
import { TickersVM } from '../models/coins/TickersVM';
import { ConvertCoinVM } from '../models/coins/ConvertCoinVM';
import { CoinPricesContainerVM } from '../models/coins/CoinPricesContainerVM';

@Injectable({
  providedIn: 'root'
})
export class CoinsService {

  constructor(private baseService: BaseService,
    private storageService: StorageService) { }

  getTickers(): Observable<ServiceResult<TickersVM>>
  {
    let myParams = new HttpParams()
    .append('coin', 'ETH');

    return this.baseService.getForCoins(environment.Api.Coin.Url + environment.Api.Coin.Endpoint.Endpoint_ticker, myParams)
      .pipe(map(responseData=>{

        var resp = responseData as ServiceResult<TickersVM>;

        this.storageService.setItem(environment.SessionKeys.Coin.CoinTickersData,JSON.stringify(resp));

        return resp;
    }));
  }

  convertTo() : Observable<ServiceResult<ConvertCoinVM>>
  { 
    let myParams = new HttpParams()
    .append('qty', '25')
    .append('from', 'ETH')
    .append('to', 'USD');

    return this.baseService.getForCoins(environment.Api.Coin.Url + environment.Api.Coin.Endpoint.Endpoint_convert, myParams);
  }

  getAllPrices() : Observable<ServiceResult<CoinPricesContainerVM>>
  {
    let myParams = new HttpParams()
    .append('coin', 'ETH');

    return this.baseService.getForCoins(environment.Api.Coin.Url + environment.Api.Coin.Endpoint.Endpoint_prices, myParams);
  }
}
