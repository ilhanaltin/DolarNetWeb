import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { CurrencyRatesVM } from 'src/app/main/models/integration/currency/CurrencyRatesVM';
import { HomeComponent } from '../../home/home.component';
import { GoldRatesVM } from 'src/app/main/models/integration/gold/GoldRatesVM';
import { BorsaRatesVM } from 'src/app/main/models/integration/borsa/BorsaRatesVM';
import { CurrencyBarVM } from 'src/app/main/models/integration/CurrencyBarVM';

import { CurrencyService } from '../../../services/currency.service';
import { Subscription, timer, Subject } from 'rxjs';
import { GoldService } from '../../../services/gold.service';
import { BorsaService } from '../../../services/borsa.service';

@Component({
  selector: 'currency-bar',
  templateUrl: './currency-bar.component.html',
  styleUrls: ['./currency-bar.component.css']
})
export class CurrencyBarComponent implements OnInit {

  private myTimerSub: Subscription;    

  currencyRates: CurrencyRatesVM[];
  goldRates: GoldRatesVM[];
  borsaRates: BorsaRatesVM[];

  currencyBarVM: CurrencyBarVM;

  constructor(private _currencyService: CurrencyService, 
    private _goldService: GoldService,
    private _borsaService: BorsaService) {     

      this.currencyBarVM = new CurrencyBarVM({});
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

            this.setCurrencyValues();
            this.getGoldData();
            this.getBistData();
        }
        else
        {
            this._currencyService.getFromApi().subscribe(resp=>{
              this.currencyRates = resp.result;

              this.setCurrencyValues();
              this.getGoldData();
              this.getBistData();
            });
        }
  }

  getGoldData()
  {
        let storageDataGold = this._goldService.getFromStorage();

        if(storageDataGold.isValid)
        {
            this.goldRates = storageDataGold.data;
            this.setGoldValues();
        }
        else
        {
            this._goldService.getFromApi().subscribe(resp=>{
              this.goldRates = resp.result;
              this.setGoldValues();
            });
        }
  }

  getBistData()
  {
        let storageDataBorsa = this._borsaService.getFromStorage();

        if(storageDataBorsa.isValid)
        {
            this.borsaRates = storageDataBorsa.data;
            this.setBorsaValues();
        }
        else
        {
            this._borsaService.getFromApi().subscribe(resp=>{
                this.borsaRates = resp.result;
                this.setBorsaValues();
            });
        }   
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

    //GOLD ONS
    this.currencyBarVM.goldOnsTLValueInt =  this.goldRates.find(t=>t.name == "ONS").buying;
    this.currencyBarVM.goldOnsTLValueStr =  this.currencyBarVM.goldOnsTLValueInt.toLocaleString('tr-TR', {
      maximumFractionDigits: 6,
    });

    this.currencyBarVM.goldOnsTLRateStr =  this.goldRates.find(t=>t.name == "ONS").rate.toLocaleString('tr-TR', {
      maximumFractionDigits: 4,
    });

    this.currencyBarVM.goldOnsTLRateInt =  this.goldRates.find(t=>t.name == "ONS").rate;
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
      
  }
}