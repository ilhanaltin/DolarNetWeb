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

}
