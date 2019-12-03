import { RatesVM } from './../../models/currency/RatesVM';
import { GlobalConstants } from './../../models/constants/GlobalConstants';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { HomeComponent } from '../home/home.component';
import { takeUntil } from 'rxjs/operators';
import { TypeVM } from '../../models/types/TypeVM';

@Component({
  selector: 'converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.css']
})
export class ConverterComponent implements OnInit {

  currencies = [];
  selectedD = 2;
  currencyRates: RatesVM[];
  currencyFirst: number;
  currencySecond: number;
  currencyThird: number;

  currencyTypeFirst: string;
  currencyTypeSecond: string;
  currencyTypeThird: string;

  baseConverter: string;

  optionAlisSatis: number;

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
     
     this.optionAlisSatis = GlobalConstants.Alis;
   }

  ngOnInit() {

    this._homeComponent.onCurrencyDataChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(resp => {
                this.currencyRates = resp;
            });
  }

  onConverterChange()
  {
    this.onTextBoxChange(this.baseConverter);
  }  

  onTextBoxChange(converter)
  {
    this.baseConverter = converter;

    let currencyFirstBuyOrSell = this.currencyTypeFirst === GlobalConstants.baseCurrency ? 1 :
      (this.optionAlisSatis == GlobalConstants.Alis ? 
        this.currencyRates.find(t=>t.code === this.currencyTypeFirst).buying : 
            this.currencyRates.find(t=>t.code === this.currencyTypeFirst).selling);

    let currencySecondBuyOrSell = this.currencyTypeSecond === GlobalConstants.baseCurrency ? 1 :
      (this.optionAlisSatis == GlobalConstants.Alis ? 
        this.currencyRates.find(t=>t.code === this.currencyTypeSecond).buying : 
          this.currencyRates.find(t=>t.code === this.currencyTypeSecond).selling);

    let currencyThirdBuyOrSell = this.currencyTypeThird === GlobalConstants.baseCurrency ? 1 :
      (this.optionAlisSatis == GlobalConstants.Alis ? 
        this.currencyRates.find(t=>t.code === this.currencyTypeThird).buying : 
          this.currencyRates.find(t=>t.code === this.currencyTypeThird).selling);

    if(converter === '1')
    {
        if(this.currencyTypeFirst === GlobalConstants.baseCurrency)
        {
          this.currencySecond = +((currencySecondBuyOrSell * this.currencyFirst).toFixed(4));
          this.currencyThird = +((currencyThirdBuyOrSell * this.currencyFirst).toFixed(4));  
        }
        else
        {
          this.currencySecond = +((this.currencyFirst / currencyFirstBuyOrSell) * currencySecondBuyOrSell).toFixed(4);
          this.currencyThird = +((this.currencyFirst / currencyFirstBuyOrSell) * currencyThirdBuyOrSell).toFixed(4);
        }
    }
    else if(converter === '2')
    {
      if(this.currencyTypeSecond === GlobalConstants.baseCurrency)
      {
        this.currencyFirst = +(currencyFirstBuyOrSell * this.currencySecond).toFixed(4);
        this.currencyThird = +(currencyThirdBuyOrSell * this.currencySecond).toFixed(4);
      }
      else
      {
        this.currencyFirst = +((this.currencySecond / currencySecondBuyOrSell) * currencyFirstBuyOrSell).toFixed(4);
        this.currencyThird = +((this.currencySecond / currencySecondBuyOrSell) * currencyThirdBuyOrSell).toFixed(4);
      }
    }
    else if(converter === '3')
    {
      if(this.currencyTypeThird === GlobalConstants.baseCurrency)
      {
        this.currencyFirst = +(currencyFirstBuyOrSell * this.currencyThird).toFixed(4);
        this.currencySecond = +(currencySecondBuyOrSell * this.currencyThird).toFixed(4);
      }
      else
      {
        this.currencyFirst = +((this.currencyThird / currencyThirdBuyOrSell) * currencyFirstBuyOrSell).toFixed(4);
        this.currencySecond = +((this.currencyThird / currencyThirdBuyOrSell) * currencySecondBuyOrSell).toFixed(4);
      }
    }
  }

  getCurrencies() {

    let currencyArray: TypeVM[] = [];
    GlobalConstants.symbols.sort().forEach(function(value, index){
      let curr = new TypeVM();
      curr.adi = value;
      curr.id = index + 1;
      currencyArray.push(curr);
   });

    return currencyArray;
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
