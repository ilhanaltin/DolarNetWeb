import { GlobalConstants } from './../../models/constants/GlobalConstants';
import { Component, OnInit } from '@angular/core';
import { LatestVM } from '../../models/Currency/LatestVM';
import { Subject } from 'rxjs';
import { HomeComponent } from '../home/home.component';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.css']
})
export class ConverterComponent implements OnInit {

  currencies = [];
  selectedD = 2;
  currencyData: LatestVM;
  currencyFirst: number;
  currencySecond: number;
  currencyThird: number;

  currencyTypeFirst: string;
  currencyTypeSecond: string;
  currencyTypeThird: string;

  baseConverter: string;

  // Private
  private _unsubscribeAll: Subject<any>;

  constructor(private _homeComponent: HomeComponent) {
    this.currencies = this.getCurrencies();

     // Set the private defaults
     this._unsubscribeAll = new Subject();

     this.currencyTypeFirst = "TRY";
     this.currencyTypeSecond= "USD";
     this.currencyTypeThird = "EUR";

     this.baseConverter = "1";
   }

  ngOnInit() {

    this._homeComponent.onCurrencyDataChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(resp => {
                this.currencyData = resp;
            });
  }

  onConverterChange(currencyKey, converter)
  {
    this.onTextBoxChange(this.baseConverter);
  }  

  onTextBoxChange(converter)
  {
    this.baseConverter = converter;

    if(converter === '1')
    {
        let secondCurrencyRate = this.currencyTypeSecond === GlobalConstants.baseCurrency ? 1 :
            this.currencyData.currencyRates.rates.find(t=>t.currency === this.currencyTypeSecond).rate;

        let thirdCurrencyRate = this.currencyTypeThird === GlobalConstants.baseCurrency ? 1 : 
            this.currencyData.currencyRates.rates.find(t=>t.currency === this.currencyTypeThird).rate;

        if(this.currencyTypeFirst === GlobalConstants.baseCurrency)
        {
          this.currencySecond = +((secondCurrencyRate * this.currencyFirst).toFixed(4));
          this.currencyThird = +((thirdCurrencyRate * this.currencyFirst).toFixed(4));  
        }
        else
        {
          let firstCurrencyRate = this.currencyData.currencyRates.rates.find(t=>t.currency === this.currencyTypeFirst).rate;

          this.currencySecond = +((this.currencyFirst / firstCurrencyRate) * secondCurrencyRate).toFixed(4);
          this.currencyThird = +((this.currencyFirst / firstCurrencyRate) * thirdCurrencyRate).toFixed(4);
        }
    }
    else if(converter === '2')
    {
      let firstCurrencyRate = this.currencyTypeFirst === GlobalConstants.baseCurrency ? 1 : 
          this.currencyData.currencyRates.rates.find(t=>t.currency === this.currencyTypeFirst).rate;
      let thirdCurrencyRate = this.currencyTypeThird === GlobalConstants.baseCurrency ? 1 : 
          this.currencyData.currencyRates.rates.find(t=>t.currency === this.currencyTypeThird).rate;

      if(this.currencyTypeSecond === GlobalConstants.baseCurrency)
      {
        this.currencyFirst = +(firstCurrencyRate * this.currencySecond).toFixed(4);
        this.currencyThird = +(thirdCurrencyRate * this.currencySecond).toFixed(4);
      }
      else
      {
        let secondCurrencyRate = this.currencyData.currencyRates.rates.find(t=>t.currency === this.currencyTypeSecond).rate;

        this.currencyFirst = +((this.currencySecond / secondCurrencyRate) * firstCurrencyRate).toFixed(4);
        this.currencyThird = +((this.currencySecond / secondCurrencyRate) * thirdCurrencyRate).toFixed(4);
      }
    }
    else if(converter === '3')
    {
      let firstCurrencyRate = this.currencyTypeFirst === GlobalConstants.baseCurrency ? 1 : 
          this.currencyData.currencyRates.rates.find(t=>t.currency === this.currencyTypeFirst).rate;
      let secondCurrencyRate = this.currencyTypeSecond === GlobalConstants.baseCurrency ? 1 : 
          this.currencyData.currencyRates.rates.find(t=>t.currency === this.currencyTypeSecond).rate;

      if(this.currencyTypeThird === GlobalConstants.baseCurrency)
      {
        this.currencyFirst = +(firstCurrencyRate * this.currencyThird).toFixed(4);
        this.currencySecond = +(secondCurrencyRate * this.currencyThird).toFixed(4);
      }
      else
      {
        let thirdCurrencyRate = this.currencyData.currencyRates.rates.find(t=>t.currency === this.currencyTypeThird).rate;

        this.currencyFirst = +((this.currencyThird / thirdCurrencyRate) * firstCurrencyRate).toFixed(4);
        this.currencySecond = +((this.currencyThird / thirdCurrencyRate) * secondCurrencyRate).toFixed(4);
      }
    }
  }

  getCurrencies() {
    return [
      { id: 1, name: 'TRY' },
      { id: 2, name: 'USD' },
      { id: 3, name: 'EUR' }
    ];
  }

   /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
