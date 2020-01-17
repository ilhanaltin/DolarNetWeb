import { Component, OnInit } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { ParitelerService } from 'src/app/main/services/pariteler.service';
import { ParitelerVM } from 'src/app/main/models/integration/currency/ParitelerVM';

@Component({
  selector: 'pariteler-list',
  templateUrl: './pariteler-list.component.html',
  styleUrls: ['./pariteler-list.component.css']
})
export class ParitelerListComponent implements OnInit {

  private myTimerSub: Subscription;

  pariteler: ParitelerVM[];
  
  constructor(private _paritelerService: ParitelerService) { }

  ngOnInit() {
    const ti = timer(0,60000);
        this.myTimerSub = ti.subscribe(t => {
            this.getPariteData();
        });
  }

  getPariteData()
  {
        let storageData = this._paritelerService.getFromStorage();

        if(storageData.isValid)
        {
            this.pariteler = storageData.data;
        }
        else
        {
            this._paritelerService.getFromApi().subscribe(resp=>{
              this.pariteler = resp.result;
            });
        }
  }
}
