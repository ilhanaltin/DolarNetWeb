import { ConvertCoinVM } from './../Models/Coins/ConvertCoinVM';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TickersVM } from '../Models/Coins/TickersVM';
import { CoinPricesContainerVM } from '../Models/Coins/CoinPricesContainerVM';
import { ServiceResult } from '../Models/ServiceResult';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class CoinsService {

  constructor(private baseService: BaseService) { }

  getTickers(): Observable<ServiceResult<TickersVM>>
  {
    let myParams = new HttpParams()
    .append('coin', 'ETH');

    return this.baseService.getForCoins(environment.Api.Coin.Url + environment.Api.Coin.Endpoint.Endpoint_ticker, myParams);
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
