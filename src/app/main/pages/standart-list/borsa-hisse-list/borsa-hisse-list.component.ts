import { Component, OnInit } from '@angular/core';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'borsa-hisse-list',
  templateUrl: './borsa-hisse-list.component.html',
  styleUrls: ['./borsa-hisse-list.component.css']
})
export class BorsaHisseListComponent implements OnInit {

  private myTimerSub: Subscription;

  constructor() { }

  ngOnInit() {
    const ti = timer(0,60000);

        this.myTimerSub = ti.subscribe(t => {
        });
  }

 
}
