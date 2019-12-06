import { MarketAnalyseVM } from './../../models/integration/MarketAnalyseVM';
import { Component, OnInit } from '@angular/core';
import { CriptoRatesVM } from '../../models/coins/CriptoRatesVM';
import { Subject } from 'rxjs';
import { HomeComponent } from '../home/home.component';
import { CurrencyRatesVM } from '../../models/integration/currency/CurrencyRatesVM';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'market-analyse',
  templateUrl: './market-analyse.component.html',
  styleUrls: ['./market-analyse.component.css']
})
export class MarketAnalyseComponent implements OnInit {

  criptoRates: CriptoRatesVM[];
  currencyRates: CurrencyRatesVM[];

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

      //EURO TL
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
    //BITCOIN TL
    this.marketAnalyseVM.bitcoinTLValueInt =  this.criptoRates.find(t=>t.symbol == "BTC").price;
    this.marketAnalyseVM.bitcoinTLValueStr = this.marketAnalyseVM.bitcoinTLValueInt.toLocaleString('tr-TR', {
      maximumFractionDigits: 2,
    });

    this.marketAnalyseVM.bitcoinTLRateStr =  this.criptoRates.find(t=>t.symbol == "BTC").percentChange24h.toLocaleString('tr-TR', {
      maximumFractionDigits: 2,
    });

    this.marketAnalyseVM.bitcoinTLRateInt =  this.criptoRates.find(t=>t.symbol == "BTC").percentChange24h;

    //ETHERIUM TL
    this.marketAnalyseVM.etheriumTLValueInt =  this.criptoRates.find(t=>t.symbol == "ETH").price;
    this.marketAnalyseVM.etheriumTLValueStr = this.marketAnalyseVM.etheriumTLValueInt.toLocaleString('tr-TR', {
      maximumFractionDigits: 2,
    });

    this.marketAnalyseVM.etheriumTLRateStr =  this.criptoRates.find(t=>t.symbol == "ETH").percentChange24h.toLocaleString('tr-TR', {
      maximumFractionDigits: 2,
    });

    this.marketAnalyseVM.etheriumTLRateInt =  this.criptoRates.find(t=>t.symbol == "ETH").percentChange24h;

    //XRP TL
    this.marketAnalyseVM.xrpTLValueInt =  this.criptoRates.find(t=>t.symbol == "XRP").price;
    this.marketAnalyseVM.xrpTLValueStr = this.marketAnalyseVM.xrpTLValueInt.toLocaleString('tr-TR', {
      maximumFractionDigits: 2,
    });

    this.marketAnalyseVM.xrpTLRateStr =  this.criptoRates.find(t=>t.symbol == "XRP").percentChange24h.toLocaleString('tr-TR', {
      maximumFractionDigits: 2,
    });

    this.marketAnalyseVM.xrpTLRateInt =  this.criptoRates.find(t=>t.symbol == "XRP").percentChange24h;

    //Litecoin TL
    this.marketAnalyseVM.litecoinTLValueInt =  this.criptoRates.find(t=>t.symbol == "LTC").price;
    this.marketAnalyseVM.litecoinTLValueStr = this.marketAnalyseVM.litecoinTLValueInt.toLocaleString('tr-TR', {
      maximumFractionDigits: 2,
    });

    this.marketAnalyseVM.litecoinTLRateStr =  this.criptoRates.find(t=>t.symbol == "LTC").percentChange24h.toLocaleString('tr-TR', {
      maximumFractionDigits: 2,
    });

    this.marketAnalyseVM.litecoinTLRateInt =  this.criptoRates.find(t=>t.symbol == "LTC").percentChange24h;

     //Bitcoin Cache TL
     this.marketAnalyseVM.bitcoinCashTLValueInt =  this.criptoRates.find(t=>t.symbol == "BCH").price;
     this.marketAnalyseVM.bitcoinCashTLValueStr = this.marketAnalyseVM.bitcoinCashTLValueInt.toLocaleString('tr-TR', {
       maximumFractionDigits: 2,
     });
 
     this.marketAnalyseVM.bitcoinCashTLRateStr =  this.criptoRates.find(t=>t.symbol == "BCH").percentChange24h.toLocaleString('tr-TR', {
       maximumFractionDigits: 2,
     });
 
     this.marketAnalyseVM.bitcoinCashTLRateInt =  this.criptoRates.find(t=>t.symbol == "BCH").percentChange24h;
 
  }
}
