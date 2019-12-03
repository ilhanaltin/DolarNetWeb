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

    localStorage.setItem("token","Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaWQiOiIxIiwidW5pcXVlX25hbWUiOiLEsGxoYW4iLCJmYW1pbHlfbmFtZSI6IkFMVElOIiwicm9sZSI6IjEuWcO2bmV0aWNpIiwibmJmIjoxNTcwNDc2OTgzLCJleHAiOjE2MDIwMTI5ODMsImlhdCI6MTU3MDQ3Njk4M30.8-5VRRHrWXAj6NiNrZpwTn1QyopkIVq2MTO00yIsQPQ")

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
