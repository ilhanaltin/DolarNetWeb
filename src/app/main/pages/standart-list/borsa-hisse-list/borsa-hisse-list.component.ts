import { BorsaHisseRatesVM } from './../../../models/integration/borsa/BorsaHisseRatesVM';
import { BorsaHisseService } from './../../../services/borsa.hisse.service';
import { Component, OnInit } from '@angular/core';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'borsa-hisse-list',
  templateUrl: './borsa-hisse-list.component.html',
  styleUrls: ['./borsa-hisse-list.component.css']
})
export class BorsaHisseListComponent implements OnInit {

  private myTimerSub: Subscription;

  borsaHisseRates: BorsaHisseRatesVM[];

  constructor(private _borsaHisseService: BorsaHisseService) { }

  ngOnInit() {
    const ti = timer(0,60000);
        this.myTimerSub = ti.subscribe(t => {
            this.getBorsaHisseData();
        });
  }

  getBorsaHisseData()
  {
        let storageData = this._borsaHisseService.getFromStorage();

        if(storageData.isValid)
        {
            this.borsaHisseRates = storageData.data;
        }
        else
        {
            this._borsaHisseService.getFromApi().subscribe(resp=>{
              this.borsaHisseRates = resp.result;
            });
        }
  }
}
