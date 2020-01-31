import { CriptoRatesVM } from './../../models/coins/CriptoRatesVM';
import { CurrencyRatesVM } from '../../models/integration/currency/CurrencyRatesVM';
import { GlobalConstants } from './../../models/constants/GlobalConstants';
import { Component, OnInit } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { TypeVM } from '../../models/types/TypeVM';
import { GoldRatesVM } from '../../models/integration/gold/GoldRatesVM';
import { CurrencyService } from '../../services/currency.service';
import { GoldService } from '../../services/gold.service';
import { CriptoService } from '../../services/cripto.service';

@Component({
  selector: 'converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.css']
})
export class ConverterComponent implements OnInit {

  private myTimerSub: Subscription;    

  readonly _globalConstants = GlobalConstants;

  currencies = [];
  golds = [];
  coins = [];
  selectedD = 2;
  currencyRates: CurrencyRatesVM[];
  goldRates: GoldRatesVM[];
  criptoRates: CriptoRatesVM[];

  currencyFirst: number;
  currencySecond: number;
  currencyThird: number;

  currencyTypeFirst: string;
  currencyTypeSecond: string;
  currencyTypeThird: string;

  criptoFirst: number;
  criptoSecond: number;
  criptoThird: number;

  criptoTypeFirst: string;
  criptoTypeSecond: string;
  criptoTypeThird: string;

  goldFirst: number;
  goldSecond: number;

  goldTypeFirst: string;
  goldTypeSecond: string;

  optionAlisSatis: number;

  baseConverter: string;

  constructor(private _currencyService: CurrencyService, 
    private _goldService: GoldService,
    private _criptoService: CriptoService) {

    this.currencies = this.getCurrencies();
    this.golds = this.getGolds();
    this.coins = this.getCoins();

    this.baseConverter = "1";

     this.currencyTypeFirst = "TRY";
     this.currencyTypeSecond= "USD";
     this.currencyTypeThird = "EUR";

     this.goldTypeFirst = 'Çeyrek Altın';
     this.goldTypeSecond = 'TRY';

     this.criptoTypeFirst = "BTC";
     this.criptoTypeSecond= "ETH";
     this.criptoTypeThird = "USD";
     
     this.optionAlisSatis = GlobalConstants.Alis;
   }

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

            this.getGoldData();
            this.getCriptoData();
        }
        else
        {
            this._currencyService.getFromApi().subscribe(resp=>{
              this.currencyRates = resp.result;

              this.getGoldData();
              this.getCriptoData();
            });
        }
  }

  getGoldData()
  {
        let storageDataGold = this._goldService.getFromStorage();

        if(storageDataGold.isValid)
        {
            this.goldRates = storageDataGold.data;
        }
        else
        {
            this._goldService.getFromApi().subscribe(resp=>{
              this.goldRates = resp.result;
            });
        }
  }

  getCriptoData()
  {
        let storageDataCripto = this._criptoService.getFromStorage();

        if(storageDataCripto.isValid)
        {
            this.criptoRates = storageDataCripto.data;
        }
        else
        {
            this._criptoService.getFromApi().subscribe(resp=>{
                this.criptoRates = resp.result;
            });
      }
  }

  onConverterChangeCurrency()
  {
    this.onTextBoxChangeCurrency(this.baseConverter);
  }  

  onConverterChangeGold()
  {
    this.onTextBoxChangeGold(this.baseConverter);
  } 

  onConverterChangeCripto()
  {
    this.onTextBoxChangeCripto(this.baseConverter);
  }

  onTextBoxChangeCurrency(converter)
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
          this.currencySecond = +((this.currencyFirst / currencySecondBuyOrSell).toFixed(4));
          this.currencyThird = +((this.currencyFirst / currencyThirdBuyOrSell).toFixed(4));  
        }
        else
        {
          this.currencySecond = +((this.currencyFirst / currencySecondBuyOrSell) * currencyFirstBuyOrSell).toFixed(4);
          this.currencyThird = +((this.currencyFirst / currencyThirdBuyOrSell) * currencyFirstBuyOrSell).toFixed(4);
        }
    }
    else if(converter === '2')
    {
      if(this.currencyTypeSecond === GlobalConstants.baseCurrency)
      {
        this.currencyFirst = +(this.currencySecond / currencyFirstBuyOrSell).toFixed(4);
        this.currencyThird = +(this.currencySecond / currencyThirdBuyOrSell).toFixed(4);
      }
      else
      {
        this.currencyFirst = +((this.currencySecond / currencyFirstBuyOrSell) * currencySecondBuyOrSell).toFixed(4);
        this.currencyThird = +((this.currencySecond / currencyThirdBuyOrSell) * currencySecondBuyOrSell).toFixed(4);        
      }
    }
    else if(converter === '3')
    {
      if(this.currencyTypeThird === GlobalConstants.baseCurrency)
      {
        this.currencyFirst = +(this.currencyThird / currencyFirstBuyOrSell).toFixed(4);
        this.currencySecond = +(this.currencyThird / currencySecondBuyOrSell).toFixed(4);
      }
      else
      {
        this.currencyFirst = +((this.currencyThird / currencyFirstBuyOrSell) * currencyThirdBuyOrSell).toFixed(4);
        this.currencySecond = +((this.currencyThird / currencySecondBuyOrSell) * currencyThirdBuyOrSell).toFixed(4);
      }
    }
  }

  onTextBoxChangeGold(converter)
  {
    this.baseConverter = converter;

    let goldValue = this.goldRates.find(t=>t.name === this.goldTypeFirst).buying;
    let secondCurrencyEffect = this.goldTypeSecond == GlobalConstants.baseCurrency ? 1 : this.currencyRates.find(t=>t.code === this.goldTypeSecond).buying

    if(converter === '1')
    {
        this.goldSecond = +(this.goldFirst * (goldValue / secondCurrencyEffect)).toFixed(4);
    }
    else if(converter === '2')
    {
        this.goldFirst = +(this.goldSecond / (goldValue * secondCurrencyEffect)).toFixed(4);
    }
  }

  onTextBoxChangeCripto(converter)
  {
      this.baseConverter = converter;

      let criptoValueFirst = this.criptoRates.find(t=>t.code === this.criptoTypeFirst).price;
      let criptoValueSecond  = this.criptoRates.find(t=>t.code === this.criptoTypeSecond).price;
      let currencyValueThird = this.criptoTypeThird === GlobalConstants.baseCurrency ? 1 : this.currencyRates.find(t=>t.code === this.criptoTypeThird).buying;
      let baseCurrencyValueCripto = this.currencyRates.find(t=>t.code === GlobalConstants.baseCurrencyCripto).buying;

      if(converter === '1')
      {
          this.criptoSecond = +(this.criptoFirst * (criptoValueFirst / criptoValueSecond)).toFixed(4);

          if(this.currencyTypeThird === GlobalConstants.baseCurrencyCripto)
          {
              this.criptoThird = +(this.criptoFirst * criptoValueFirst).toFixed(4);
          }
          else
          {
              this.criptoThird = +(this.criptoFirst * criptoValueFirst * (baseCurrencyValueCripto / currencyValueThird)).toFixed(4);
          }
      }
      else if(converter === '2')
      {
          this.criptoFirst = +(this.criptoSecond * (criptoValueSecond / criptoValueFirst)).toFixed(4);

          if(this.currencyTypeThird === GlobalConstants.baseCurrencyCripto)
          {
              this.criptoThird = +(this.criptoSecond * criptoValueSecond).toFixed(4);
          }
          else
          {
              this.criptoThird = +(this.criptoSecond * criptoValueSecond * (baseCurrencyValueCripto / currencyValueThird)).toFixed(4);
          } 
      }
      else if(converter === '3')
      {
        if(this.criptoTypeThird === GlobalConstants.baseCurrencyCripto)
        {
            this.criptoFirst = +(this.criptoThird / criptoValueFirst).toFixed(4);
            this.criptoSecond = +(this.criptoThird / criptoValueSecond).toFixed(4);
        }
        else
        {
          this.criptoFirst = +(this.criptoThird / (criptoValueFirst * (currencyValueThird / baseCurrencyValueCripto))).toFixed(4);
          this.criptoSecond = +(this.criptoThird / (criptoValueSecond * (currencyValueThird / baseCurrencyValueCripto))).toFixed(4);
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

  getGolds() {
    let goldArray: TypeVM[] = [];

    GlobalConstants.goldTypes.forEach(function(value, index){
      let gold = new TypeVM();
      gold.adi = value;
      gold.kisaAdi = GlobalConstants.goldTypesShort[index];
      gold.id = index + 1;
      goldArray.push(gold);
   });

    return goldArray;
  }

  getCoins() {
    let criptoArray: TypeVM[] = [];

    GlobalConstants.criptoTypes.forEach(function(value, index){
      let coin = new TypeVM();
      coin.adi = value;
      coin.kisaAdi = value;
      coin.id = index + 1;
      criptoArray.push(coin);
   });

    return criptoArray;
  }

   /**
     * On destroy
     */
    ngOnDestroy(): void
    {
    }
}