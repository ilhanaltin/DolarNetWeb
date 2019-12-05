import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CurrencyRatesVM } from 'src/app/main/models/integration/currency/CurrencyRatesVM';
import { HomeComponent } from '../../home/home.component';
import { GoldRatesVM } from 'src/app/main/models/integration/gold/GoldRatesVM';
import { BorsaRatesVM } from 'src/app/main/models/integration/borsa/BorsaRatesVM';
import { CurrencyBarVM } from 'src/app/main/models/integration/CurrencyBarVM';

@Component({
  selector: 'currency-bar',
  templateUrl: './currency-bar.component.html',
  styleUrls: ['./currency-bar.component.css']
})
export class CurrencyBarComponent implements OnInit {

  currencyRates: CurrencyRatesVM[];
  goldRates: GoldRatesVM[];
  borsaRates: BorsaRatesVM[];

  currencyBarVM: CurrencyBarVM;

  private _unsubscribeAll: Subject<any>;

  constructor(private _homeComponent: HomeComponent) { 
      
      // Set the private defaults
      this._unsubscribeAll = new Subject();

      this.currencyBarVM = new CurrencyBarVM({});
  }

  ngOnInit() {
    this._homeComponent.onCurrencyDataChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(resp => {
                this.currencyRates = resp;
                this.setCurrencyValues();
            });

    this._homeComponent.onGoldDataChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(resp => {
                this.goldRates = resp;
                this.setGoldValues();
            });

    this._homeComponent.onBorsaDataChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(resp => {
                this.borsaRates = resp;
                this.setBorsaValues();
            });
  }

  setCurrencyValues()
  {
      //DOLAR TL
      this.currencyBarVM.dolarTLValueInt =  this.currencyRates.find(t=>t.code == "USD").buying;
      this.currencyBarVM.dolarTLValueStr = this.currencyBarVM.dolarTLValueInt.toLocaleString('tr-TR', {
        maximumFractionDigits: 6,
      });

      this.currencyBarVM.dolarTLRateStr =  this.currencyRates.find(t=>t.code == "USD").rate.toLocaleString('tr-TR', {
        maximumFractionDigits: 4,
      });

      this.currencyBarVM.dolarTLRateInt =  this.currencyRates.find(t=>t.code == "USD").rate;
      
      //EURO TL
      this.currencyBarVM.euroTLValueInt =  this.currencyRates.find(t=>t.code == "EUR").buying;
      this.currencyBarVM.euroTLValueStr =  this.currencyBarVM.euroTLValueInt.toLocaleString('tr-TR', {
        maximumFractionDigits: 6,
      });
      
      this.currencyBarVM.euroTLRateStr =  this.currencyRates.find(t=>t.code == "EUR").rate.toLocaleString('tr-TR', {
        maximumFractionDigits: 4,
      });

      this.currencyBarVM.euroTLRateInt =  this.currencyRates.find(t=>t.code == "EUR").rate;

      //STERLIN TL
      this.currencyBarVM.sterlinTLValueInt =  this.currencyRates.find(t=>t.code == "GBP").buying;
      this.currencyBarVM.sterlinTLValueStr =  this.currencyBarVM.sterlinTLValueInt.toLocaleString('tr-TR', {
        maximumFractionDigits: 6,
      });
      
      this.currencyBarVM.sterlinTLRateStr =  this.currencyRates.find(t=>t.code == "GBP").rate.toLocaleString('tr-TR', {
        maximumFractionDigits: 4,
      });

      this.currencyBarVM.sterlinTLRateInt =  this.currencyRates.find(t=>t.code == "GBP").rate;
  }

  setGoldValues()
  {
    //GOLD TL
    this.currencyBarVM.goldTLValueInt =  this.goldRates.find(t=>t.name == "Gram Altın").buying;
    this.currencyBarVM.goldTLValueStr =  this.currencyBarVM.goldTLValueInt.toLocaleString('tr-TR', {
      maximumFractionDigits: 6,
    });

    this.currencyBarVM.goldTLRateStr =  this.goldRates.find(t=>t.name == "Gram Altın").rate.toLocaleString('tr-TR', {
      maximumFractionDigits: 4,
    });

    this.currencyBarVM.goldTLRateInt =  this.goldRates.find(t=>t.name == "Gram Altın").rate;
  }

  setBorsaValues(){
    //BORSA TL
    this.currencyBarVM.borsaTLValueInt =  this.borsaRates[0].current;
    this.currencyBarVM.borsaTLValueStr =  this.currencyBarVM.borsaTLValueInt.toLocaleString('tr-TR', {
      maximumFractionDigits: 5,
    });

    this.currencyBarVM.borsaTLRateStr =  this.borsaRates[0].changeRate.toLocaleString('tr-TR', {
      maximumFractionDigits: 4,
    });

    this.currencyBarVM.borsaTLRateInt =  this.borsaRates[0].changeRate;
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
