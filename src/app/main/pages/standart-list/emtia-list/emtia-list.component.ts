import { Component, OnInit } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { EmtiaRatesVM } from 'src/app/main/models/integration/emtia/EmtiaRatesVM';
import { EmtiaService } from 'src/app/main/services/emtia.service';

@Component({
  selector: 'app-emtia-list',
  templateUrl: './emtia-list.component.html',
  styleUrls: ['./emtia-list.component.css']
})
export class EmtiaListComponent implements OnInit {

  private myTimerSub: Subscription;

  emtiaRates: EmtiaRatesVM[];

  constructor(private _emtiaService: EmtiaService) { }

  ngOnInit() {
    const ti = timer(0,60000);

        this.myTimerSub = ti.subscribe(t => {    
            this.getEmtiaData();
        });
  }

  getEmtiaData()
  {
        let storageDataEmtia = this._emtiaService.getFromStorage();

        if(storageDataEmtia.isValid)
        {
            this.emtiaRates = storageDataEmtia.data;
        }
        else
        {
            this._emtiaService.getFromApi().subscribe(resp=>{
                this.emtiaRates = resp.result;
            });
        }
  }
}
