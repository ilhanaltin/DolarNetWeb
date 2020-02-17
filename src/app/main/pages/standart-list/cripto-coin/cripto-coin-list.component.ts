import { Component, OnInit } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { CriptoRatesVM } from 'src/app/main/models/coins/CriptoRatesVM';
import { CriptoService } from 'src/app/main/services/cripto.service';
import { CurrencyRatesVM } from 'src/app/main/models/integration/currency/CurrencyRatesVM';
import { CurrencyService } from 'src/app/main/services/currency.service';

@Component({
  selector: 'cripto-coin-list',
  templateUrl: './cripto-coin-list.component.html',
  styleUrls: ['./cripto-coin-list.component.css']
})
export class CriptoCoinListComponent implements OnInit {

  private myTimerSub: Subscription;    

  criptoRates: CriptoRatesVM[];
  currencyRates: CurrencyRatesVM[];

  constructor(
    private _criptoService: CriptoService,
    private _currencyService: CurrencyService) { }

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
            this.getCriptoData();
        }
        else
        {
            this._currencyService.getFromApi().subscribe(resp=>{
                this.currencyRates = resp.result;
                this.getCriptoData();
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

  getCriptoFlagCss(code: string) : string
  {
      if(code == null || code == "")
        return "";

      return "https://api.dolar.net/Images/cripto-coin-icons/" + code.toLocaleLowerCase().split("ı").join("i") + ".png";
  }

  getConvertedToTry(value: number) : string
  {
      return (value * this.currencyRates.find(t=>t.code == "USD").buying).toLocaleString('tr-TR', {
        maximumFractionDigits: 4,
      });
  }
}