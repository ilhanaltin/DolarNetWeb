import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../../services/currency.service';
import { Subscription, timer, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private myTimerSub: Subscription;    
  subscription: Subscription;
  onCurrencyDataChanged: Subject<any>;

  constructor(private currencyService: CurrencyService) 
  {
      this.onCurrencyDataChanged = new Subject();
  }

  ngOnInit() {

    const ti = timer(0,10000);

    this.myTimerSub = ti.subscribe(t => {    
      console.log("Tick"); 

      let storageData = this.currencyService.getFromStorage();

      if(storageData.isValid)
      {
          this.onCurrencyDataChanged.next(storageData.data);
      }
      else
      {
          this.currencyService.getFromApi().subscribe(resp=>{
              this.onCurrencyDataChanged.next(resp.result);
          });
      }
    });
  }  
}
