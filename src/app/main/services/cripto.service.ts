import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServiceResult } from '../models/ServiceResult';
import { BaseService } from './base.service';
import { StorageService } from './storage.service';
import { apiConfig } from 'src/@dolarnet/dolarnet-config/api.config';
import { DataValidation } from '../models/integration/DataValidation';
import { CriptoRatesVM } from '../models/coins/CriptoRatesVM';

@Injectable({
  providedIn: 'root'
})
export class CriptoService {

  constructor(private baseService: BaseService) { }

    getFromStorage() : DataValidation<CriptoRatesVM[]>
    {
      var response = new DataValidation<CriptoRatesVM[]>();
  
      var periodicData = JSON.parse(localStorage.getItem(apiConfig.SessionKeys.Cripto.CriptoDataRefreshedPeriodically)) as CriptoRatesVM[];
  
      if(periodicData == null)
      {
        return response;
      }
  
      let storedDataDate = Date.parse(periodicData[0].dateTime.toString());
      let nowDateTime = new Date(Date.now()).getTime();
      let time = nowDateTime - storedDataDate;  //msec
      let minutesDiff = time / (60 * 1000);
  
      if(minutesDiff < 15)
      {
        response.isValid = true;
        response.data = periodicData;
      }
  
      return response;
    }
  
    getFromApi() : Observable<ServiceResult<CriptoRatesVM[]>>
    {
      return this.baseService.get(apiConfig.Api.Main.Url + apiConfig.Services.Cripto.GetAllCoins, null, true)
        .pipe(map(responseData =>{
  
          var resp = responseData as ServiceResult<CriptoRatesVM[]>;
  
          localStorage.setItem(apiConfig.SessionKeys.Cripto.CriptoDataRefreshedPeriodically ,JSON.stringify(resp.result));
  
          resp.status = 200;
  
          return resp;
        }));
    }
}
