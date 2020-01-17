import { BorsaLiveRatesVM } from '../../../models/integration/borsa/BorsaLiveRatesVM';
import { BorsaLiveService } from '../../../services/borsa.live.service';
import { Component, OnInit } from '@angular/core';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'borsa-live-list',
  templateUrl: './borsa-live-list.component.html',
  styleUrls: ['./borsa-live-list.component.css']
})
export class BorsaLiveListComponent implements OnInit {

  private myTimerSub: Subscription;

  borsaLiveRates: BorsaLiveRatesVM[];

  constructor(private _borsaLiveService: BorsaLiveService) { }

  ngOnInit() {
    const ti = timer(0,60000);
        this.myTimerSub = ti.subscribe(t => {
            this.getBorsaLiveData();
        });
  }

  getBorsaLiveData()
  {
        let storageData = this._borsaLiveService.getFromStorage();

        if(storageData.isValid)
        {
            this.borsaLiveRates = storageData.data;
        }
        else
        {
            this._borsaLiveService.getFromApi().subscribe(resp=>{
              this.borsaLiveRates = resp.result;
            });
        }
  }
}
