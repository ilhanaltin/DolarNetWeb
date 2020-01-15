import { GlobalConstants } from 'src/app/main/models/constants/GlobalConstants';
import { CurrencyService } from './../../../services/currency.service';
import { Component, OnInit } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { CurrencyRatesVM } from 'src/app/main/models/integration/currency/CurrencyRatesVM';

@Component({
  selector: 'doviz-list',
  templateUrl: './doviz-list.component.html',
  styleUrls: ['./doviz-list.component.css']
})
export class DovizListComponent implements OnInit {

  private myTimerSub: Subscription;    

  currencyRates: CurrencyRatesVM[];

  constructor(private _currencyService: CurrencyService) { }

  ngOnInit() {
    const ti = timer(0,60000);

        this.myTimerSub = ti.subscribe(t => {    
            this.getCurrencyAndConnectedData();
        });
  }

  getCurrencyAndConnectedData()
  {
        let storageDataCurrency = this._currencyService.getFromStorage();

        if(storageDataCurrency.isValid)
        {
            this.currencyRates = storageDataCurrency.data;
        }
        else
        {
            this._currencyService.getFromApi().subscribe(resp=>{
                this.currencyRates = resp.result;
            });
        }
  }

  getCurrencyFlagCss(code: string) : string
  {
      if(code == null || code == "")
        return "";

      return "flag-icon flag-icon-" + code.toLocaleLowerCase().split("ı").join("i").substring(0,2);
  }

  getCurrencyName(code: string) : string
  {
      return GlobalConstants.symbolNames[GlobalConstants.symbols.indexOf(code)];
  }
}
