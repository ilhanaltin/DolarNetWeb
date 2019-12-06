import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../../services/currency.service';
import { Subscription, timer, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { GoldService } from '../../services/gold.service';
import { BorsaService } from '../../services/borsa.service';
import { CriptoService } from '../../services/cripto.service';

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

  constructor(private _currencyService: CurrencyService, 
    private _goldService: GoldService,
    private _borsaService: BorsaService,
    private _criptoService: CriptoService) 
  {
      this.onCurrencyDataChanged = new Subject();
      this.onGoldDataChanged = new Subject();
      this.onBorsaDataChanged = new Subject();
      this.onCriptoDataChanged = new Subject();
  }

  ngOnInit() {

    localStorage.setItem("token","Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaWQiOiIxIiwidW5pcXVlX25hbWUiOiLEsGxoYW4iLCJmYW1pbHlfbmFtZSI6IkFMVElOIiwicm9sZSI6IjEuWcO2bmV0aWNpIiwibmJmIjoxNTcwNDc2OTgzLCJleHAiOjE2MDIwMTI5ODMsImlhdCI6MTU3MDQ3Njk4M30.8-5VRRHrWXAj6NiNrZpwTn1QyopkIVq2MTO00yIsQPQ")

    const ti = timer(0,60000);

    this.myTimerSub = ti.subscribe(t => {    
      console.log("Tick"); 

      let storageDataCurrency = this._currencyService.getFromStorage();
      let storageDataGold = this._goldService.getFromStorage();
      let storageDataBorsa = this._borsaService.getFromStorage();
      let storageDataCripto = this._criptoService.getFromStorage();

      if(storageDataCurrency.isValid)
      {
          this.onCurrencyDataChanged.next(storageDataCurrency.data);

          //Get Cripto Data
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
      else
      {
          this._currencyService.getFromApi().subscribe(resp=>{
              this.onCurrencyDataChanged.next(resp.result);

              //Get Cripto Data
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
          });
      }

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
    });
  }  
}
