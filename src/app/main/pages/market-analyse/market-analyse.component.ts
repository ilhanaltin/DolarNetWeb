import { MarketAnalyseVM } from './../../models/integration/MarketAnalyseVM';
import { Component, OnInit } from '@angular/core';
import { CriptoRatesVM } from '../../models/coins/CriptoRatesVM';
import { Subject } from 'rxjs';
import { HomeComponent } from '../home/home.component';
import { CurrencyRatesVM } from '../../models/integration/currency/CurrencyRatesVM';
import { takeUntil } from 'rxjs/operators';
import { EmtiaRatesVM } from '../../models/integration/emtia/EmtiaRatesVM';

@Component({
  selector: 'market-analyse',
  templateUrl: './market-analyse.component.html',
  styleUrls: ['./market-analyse.component.css']
})
export class MarketAnalyseComponent implements OnInit {

  criptoRates: CriptoRatesVM[];
  currencyRates: CurrencyRatesVM[];
  emtiaRates: EmtiaRatesVM[];

  marketAnalyseVM: MarketAnalyseVM;

  private _unsubscribeAll: Subject<any>;

  constructor(private _homeComponent: HomeComponent) {

    // Set the private defaults
    this._unsubscribeAll = new Subject();

    this.marketAnalyseVM = new MarketAnalyseVM({});
   }

  ngOnInit() {
    this._homeComponent.onCurrencyDataChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(resp => {
                this.currencyRates = resp;
                this.setCurrencyValues();
            });

      this._homeComponent.onCriptoDataChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(resp => {
                this.criptoRates = resp;
                this.setCriptoValues();
            });

      this._homeComponent.onEmtiaDataChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(resp => {
                this.emtiaRates = resp;
                this.setEmtiaValues();
            });
  }

  setCurrencyValues()
  {
      //DOLAR TL
      this.marketAnalyseVM.dolarTLValueInt =  this.currencyRates.find(t=>t.code == "USD").buying;
      this.marketAnalyseVM.dolarTLValueStr = this.marketAnalyseVM.dolarTLValueInt.toLocaleString('tr-TR', {
        maximumFractionDigits: 6,
      });

      this.marketAnalyseVM.dolarTLRateStr =  this.currencyRates.find(t=>t.code == "USD").rate.toLocaleString('tr-TR', {
        maximumFractionDigits: 4,
      });

      this.marketAnalyseVM.dolarTLRateInt =  this.currencyRates.find(t=>t.code == "USD").rate;

      //EURO TL
      this.marketAnalyseVM.euroTLValueInt =  this.currencyRates.find(t=>t.code == "EUR").buying;
      this.marketAnalyseVM.euroTLValueStr =  this.marketAnalyseVM.euroTLValueInt.toLocaleString('tr-TR', {
        maximumFractionDigits: 6,
      });
      
      this.marketAnalyseVM.euroTLRateStr =  this.currencyRates.find(t=>t.code == "EUR").rate.toLocaleString('tr-TR', {
        maximumFractionDigits: 4,
      });

      this.marketAnalyseVM.euroTLRateInt =  this.currencyRates.find(t=>t.code == "EUR").rate;

      //EURO/DOLAR
      this.marketAnalyseVM.euroDolarValueInt =  this.marketAnalyseVM.euroTLValueInt / this.marketAnalyseVM.dolarTLValueInt;
      this.marketAnalyseVM.euroDolarValueStr =  this.marketAnalyseVM.euroDolarValueInt.toLocaleString('tr-TR', {
        maximumFractionDigits: 4,
      });
      
      let yesterdayEuroValue = this.marketAnalyseVM.euroTLValueInt * this.marketAnalyseVM.euroTLRateInt/100 * -1 + this.marketAnalyseVM.euroTLValueInt;
      let yesterdayDolarValue = this.marketAnalyseVM.dolarTLValueInt * this.marketAnalyseVM.dolarTLRateInt/100 * -1 + this.marketAnalyseVM.dolarTLValueInt;
      let yesterdayEuroDolarValue = yesterdayEuroValue / yesterdayDolarValue;
      let differenceEuroDolarValue = this.marketAnalyseVM.euroDolarValueInt - yesterdayEuroDolarValue;

      this.marketAnalyseVM.euroDolarRateInt =  differenceEuroDolarValue * 100 / yesterdayEuroDolarValue;

      this.marketAnalyseVM.euroDolarRateStr =  this.marketAnalyseVM.euroDolarRateInt.toLocaleString('tr-TR', {
        maximumFractionDigits: 2,
      });
  }

  setCriptoValues()
  {
    //BITCOIN DOLAR
    this.marketAnalyseVM.bitcoinTLValueInt =  this.criptoRates.find(t=>t.code == "BTC").price;
    this.marketAnalyseVM.bitcoinTLValueStr = this.marketAnalyseVM.bitcoinTLValueInt.toLocaleString('tr-TR', {
      maximumFractionDigits: 2,
    });

    this.marketAnalyseVM.bitcoinTLRateStr =  this.criptoRates.find(t=>t.code == "BTC").changeDay.toLocaleString('tr-TR', {
      maximumFractionDigits: 2,
    });

    this.marketAnalyseVM.bitcoinTLRateInt =  this.criptoRates.find(t=>t.code == "BTC").changeDay;

    //ETHERIUM DOLAR
    this.marketAnalyseVM.etheriumTLValueInt =  this.criptoRates.find(t=>t.code == "ETH").price;
    this.marketAnalyseVM.etheriumTLValueStr = this.marketAnalyseVM.etheriumTLValueInt.toLocaleString('tr-TR', {
      maximumFractionDigits: 2,
    });

    this.marketAnalyseVM.etheriumTLRateStr =  this.criptoRates.find(t=>t.code == "ETH").changeDay.toLocaleString('tr-TR', {
      maximumFractionDigits: 2,
    });

    this.marketAnalyseVM.etheriumTLRateInt =  this.criptoRates.find(t=>t.code == "ETH").changeDay;

    //XRP DOLAR
    this.marketAnalyseVM.xrpTLValueInt =  this.criptoRates.find(t=>t.code == "XRP").price;
    this.marketAnalyseVM.xrpTLValueStr = this.marketAnalyseVM.xrpTLValueInt.toLocaleString('tr-TR', {
      maximumFractionDigits: 2,
    });

    this.marketAnalyseVM.xrpTLRateStr =  this.criptoRates.find(t=>t.code == "XRP").changeDay.toLocaleString('tr-TR', {
      maximumFractionDigits: 2,
    });

    this.marketAnalyseVM.xrpTLRateInt =  this.criptoRates.find(t=>t.code == "XRP").changeDay;

    //Litecoin DOLAR
    this.marketAnalyseVM.litecoinTLValueInt =  this.criptoRates.find(t=>t.code == "LTC").price;
    this.marketAnalyseVM.litecoinTLValueStr = this.marketAnalyseVM.litecoinTLValueInt.toLocaleString('tr-TR', {
      maximumFractionDigits: 2,
    });

    this.marketAnalyseVM.litecoinTLRateStr =  this.criptoRates.find(t=>t.code == "LTC").changeDay.toLocaleString('tr-TR', {
      maximumFractionDigits: 2,
    });

    this.marketAnalyseVM.litecoinTLRateInt =  this.criptoRates.find(t=>t.code == "LTC").changeDay;

     //Bitcoin Cache DOLAR
     this.marketAnalyseVM.bitcoinCashTLValueInt =  this.criptoRates.find(t=>t.code == "BCH").price;
     this.marketAnalyseVM.bitcoinCashTLValueStr = this.marketAnalyseVM.bitcoinCashTLValueInt.toLocaleString('tr-TR', {
       maximumFractionDigits: 2,
     });
 
     this.marketAnalyseVM.bitcoinCashTLRateStr =  this.criptoRates.find(t=>t.code == "BCH").changeDay.toLocaleString('tr-TR', {
       maximumFractionDigits: 2,
     });
 
     this.marketAnalyseVM.bitcoinCashTLRateInt =  this.criptoRates.find(t=>t.code == "BCH").changeDay;
  }

  setEmtiaValues(){
      //BRENT DOLAR
      this.marketAnalyseVM.brentPetrolDolarValueInt =  this.emtiaRates.find(t=>t.name == "BRENT").selling;
      this.marketAnalyseVM.brentPetrolDolarValueStr = this.marketAnalyseVM.brentPetrolDolarValueInt.toLocaleString('tr-TR', {
        maximumFractionDigits: 4,
      });

      this.marketAnalyseVM.brentPetrolDolarRateStr =  this.emtiaRates.find(t=>t.name == "BRENT").rate.toLocaleString('tr-TR', {
        maximumFractionDigits: 2,
      });

      this.marketAnalyseVM.brentPetrolDolarRateInt =  this.emtiaRates.find(t=>t.name == "BRENT").rate;

      //Gümüş Spot DOLAR
      this.marketAnalyseVM.gumusSpotDolarValueInt =  this.emtiaRates.find(t=>t.name == "XAG/USD").selling;
      this.marketAnalyseVM.gumusSpotDolarValueStr = this.marketAnalyseVM.gumusSpotDolarValueInt.toLocaleString('tr-TR', {
        maximumFractionDigits: 4,
      });

      this.marketAnalyseVM.gumusSpotDolarRateStr =  this.emtiaRates.find(t=>t.name == "XAG/USD").rate.toLocaleString('tr-TR', {
        maximumFractionDigits: 2,
      });

      this.marketAnalyseVM.gumusSpotDolarRateInt =  this.emtiaRates.find(t=>t.name == "XPT/USD").rate;

      //Platin Spot DOLAR
      this.marketAnalyseVM.platinSpotDolarValueInt =  this.emtiaRates.find(t=>t.name == "XPT/USD").selling;
      this.marketAnalyseVM.platinSpotDolarValueStr = this.marketAnalyseVM.platinSpotDolarValueInt.toLocaleString('tr-TR', {
        maximumFractionDigits: 4,
      });

      this.marketAnalyseVM.platinSpotDolarRateStr =  this.emtiaRates.find(t=>t.name == "XPT/USD").rate.toLocaleString('tr-TR', {
        maximumFractionDigits: 2,
      });

      this.marketAnalyseVM.platinSpotDolarRateInt =  this.emtiaRates.find(t=>t.name == "XPT/USD").rate;

      //Paladyum Spot DOLAR
      this.marketAnalyseVM.paladyumSpotDolarValueInt =  this.emtiaRates.find(t=>t.name == "XPD/USD").selling;
      this.marketAnalyseVM.paladyumSpotDolarValueStr = this.marketAnalyseVM.paladyumSpotDolarValueInt.toLocaleString('tr-TR', {
        maximumFractionDigits: 4,
      });

      this.marketAnalyseVM.paladyumSpotDolarRateStr =  this.emtiaRates.find(t=>t.name == "XPD/USD").rate.toLocaleString('tr-TR', {
        maximumFractionDigits: 2,
      });

      this.marketAnalyseVM.paladyumSpotDolarRateInt =  this.emtiaRates.find(t=>t.name == "XPD/USD").rate;
  }
}
