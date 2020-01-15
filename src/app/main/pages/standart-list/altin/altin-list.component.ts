import { Component, OnInit } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { GoldRatesVM } from 'src/app/main/models/integration/gold/GoldRatesVM';
import { GoldService } from 'src/app/main/services/gold.service';

@Component({
  selector: 'altin-list',
  templateUrl: './altin-list.component.html',
  styleUrls: ['./altin-list.component.css']
})
export class AltinListComponent implements OnInit {

  private myTimerSub: Subscription;

  goldRates: GoldRatesVM[];

  constructor(private _goldService: GoldService) { }

  ngOnInit() {
    const ti = timer(0,60000);

        this.myTimerSub = ti.subscribe(t => {    
            this.getGoldData();
        });
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
}