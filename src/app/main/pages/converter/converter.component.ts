import { Component, OnInit } from '@angular/core';
import { LatestVM } from '../../models/Currency/LatestVM';
import { Subject } from 'rxjs';
import { HomeComponent } from '../home/home.component';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.css']
})
export class ConverterComponent implements OnInit {

  currencies = [];
  selectedD = 2;
  currencyData: LatestVM;

  // Private
  private _unsubscribeAll: Subject<any>;

  constructor(private _homeComponent: HomeComponent) {
    this.currencies = this.getCurrencies();

     // Set the private defaults
     this._unsubscribeAll = new Subject();
   }

  ngOnInit() {

    this._homeComponent.onCurrencyDataChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(resp => {
                this.currencyData = resp;
            });
  }

  onConverterChange(currencyKey, converter)
  {
    console.log(converter);
    console.log(currencyKey);
  }  

  onTextBoxChange(currencyValue, converter)
  {
    console.log(currencyValue);
    console.log(converter);
  }

  getCurrencies() {
    return [
      { id: 1, name: 'TL' },
      { id: 2, name: 'USD' },
      { id: 3, name: 'EURO' }
    ];
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
