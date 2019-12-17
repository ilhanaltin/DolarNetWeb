import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../../services/currency.service';
import { Subscription, timer, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { GoldService } from '../../services/gold.service';
import { BorsaService } from '../../services/borsa.service';
import { CriptoService } from '../../services/cripto.service';
import { EmtiaService } from '../../services/emtia.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private myTimerSub: Subscription;    
  subscription: Subscription;
  onCurrencyDataChanged: Subject<any>;
  onGoldDataChanged: Subject<any>;
  onBorsaDataChanged: Subject<any>;
  onCriptoDataChanged: Subject<any>;
  onEmtiaDataChanged: Subject<any>;

  constructor(private _currencyService: CurrencyService, 
    private _goldService: GoldService,
    private _borsaService: BorsaService,
    private _criptoService: CriptoService,
    private _emtiaService: EmtiaService) 
  {
      this.onCurrencyDataChanged = new Subject();
      this.onGoldDataChanged = new Subject();
      this.onBorsaDataChanged = new Subject();
      this.onCriptoDataChanged = new Subject();
      this.onEmtiaDataChanged = new Subject();
  }

  ngOnInit() {
        const ti = timer(0,60000);

        this.myTimerSub = ti.subscribe(t => {    
            console.log("Tick"); 
            this.getCurrencyAndConnectedData();
        });
  }  

  getCurrencyAndConnectedData()
  {
        let storageDataCurrency = this._currencyService.getFromStorage();

        if(storageDataCurrency.isValid)
        {
            this.onCurrencyDataChanged.next(storageDataCurrency.data);  
            this.getGoldData();
            this.getBistData();
            this.getCriptoData();
            this.getEmtiaData();        
        }
        else
        {
            this._currencyService.getFromApi().subscribe(resp=>{
                this.onCurrencyDataChanged.next(resp.result);  
                this.getGoldData();
                this.getBistData();
                this.getCriptoData();
                this.getEmtiaData();                        
            });
        }
  }

  getGoldData()
  {
        let storageDataGold = this._goldService.getFromStorage();

        if(storageDataGold.isValid)
        {
            this.onGoldDataChanged.next(storageDataGold.data);
        }
        else
        {
            this._goldService.getFromApi().subscribe(resp=>{
                this.onGoldDataChanged.next(resp.result);
            });
        }
  }

  getBistData()
  {
        let storageDataBorsa = this._borsaService.getFromStorage();

        if(storageDataBorsa.isValid)
        {
            this.onBorsaDataChanged.next(storageDataBorsa.data);
        }
        else
        {
            this._borsaService.getFromApi().subscribe(resp=>{
                this.onBorsaDataChanged.next(resp.result);
            });
        }   
  }

  getCriptoData()
  {
        let storageDataCripto = this._criptoService.getFromStorage();

        if(storageDataCripto.isValid)
        {
            this.onCriptoDataChanged.next(storageDataCripto.data);
        }
        else
        {
            this._criptoService.getFromApi().subscribe(resp=>{
                this.onCriptoDataChanged.next(resp.result);
            });
      }
  }

  getEmtiaData()
  {
        let storageDataEmtia = this._emtiaService.getFromStorage();

        if(storageDataEmtia.isValid)
        {
            this.onEmtiaDataChanged.next(storageDataEmtia.data);
        }
        else
        {
            this._emtiaService.getFromApi().subscribe(resp=>{
                this.onEmtiaDataChanged.next(resp.result);
            });
        }
  }
}
